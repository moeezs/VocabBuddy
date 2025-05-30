import { GlobalDictionaryData, isEmpty, isSiteData, SeeSiteData, SiteData } from "../utils/models";
import { combineUrl, parseURL } from "../utils/utils";
import { LocalStorage, NonVolatileBrowserStorage } from "./non-volatile-browser-storage";


export const DB_NAME = 'vocab-buddy';
export const DB_VERSION = 2;

export const MAX_LABEL_LENGTH = 64;

type SiteDataMap =  {[url: string]: SiteData}

export interface IDBSiteData extends SiteData {
    schemeAndHost: string;
    urlPath: string;
    labels?: string[];
}

function siteDataToIDBSiteData(siteData: SiteData, url: string): IDBSiteData {
    const urlList = parseURL(url);
    const schemeAndHost: string = urlList[0];
    const urlPath: string = urlList[1];

    const siteDataToStore = siteData as any;
    siteDataToStore.schemeAndHost = schemeAndHost;
    siteDataToStore.urlPath = urlPath;
    return siteDataToStore;
}

/**
 * NonVolatileBrowserStorage DAO used to store SiteData inside IndexedDB
 */
export class IndexedDBStorage implements NonVolatileBrowserStorage {
    public static readonly SITE_DATA_TABLE = 'site-data';
    public static readonly LABEL_TABLE = 'label-data';
    private static readonly TRANSFORMS = [
        () => {console.error("SHOULD NOT BE HERE");}, // noop
        IndexedDBStorage.v1Creation,
        IndexedDBStorage.addSubjectTable
    ];

    private db: IDBDatabase | null = null;  // database connection object
    private dbPromise: Promise<IDBDatabase> | null = null;

    setUp(oldStorage?: LocalStorage): Promise<IDBDatabase> {
        this.dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
            const openRequest = indexedDB.open(DB_NAME, DB_VERSION);
            openRequest.onerror = function (event) {
              reject("Problem opening DB: " + event);
            };
            let shouldPullSiteDataFromLS: boolean = false;
            openRequest.onupgradeneeded = (event: any) => {
                shouldPullSiteDataFromLS = event.oldVersion <= 0;

                const db: IDBDatabase = event.target.result;
                // Only perform transformations asociated with newer versions (older transforms not needed)
                for (let i = Math.max(0, event.oldVersion) + 1; i <= event.newVersion; i++) {
                    const func = IndexedDBStorage.TRANSFORMS[i];
                    func(db);  // Will likely need changing for future, but fine for now
                }

            };
            openRequest.onsuccess = async (event: any) => {
                this.db = event.target.result as IDBDatabase;
                if (shouldPullSiteDataFromLS && oldStorage !== undefined) {
                    const oldData = await oldStorage.getAllStorageData();
                    await this.uploadExtensionData(oldData);

                    const oldUrls = await oldStorage.getAllPageUrls();
                    for (let i = 0; i < oldUrls.length; i++) {
                        oldStorage.removePageData(oldUrls[i]);
                    }
                }

                resolve(this.db);
            };
        });

        return this.dbPromise;
    }

    getPageData(url: string): Promise<SiteData> {
        const query = (db: IDBDatabase): Promise<SiteData> => {
            const urlList = parseURL(url);
            const schemeAndHost: string = urlList[0];
            const urlPath: string = urlList[1];

            const getTransaction = db.transaction(IndexedDBStorage.SITE_DATA_TABLE, "readonly");
            const objectStore = getTransaction.objectStore(IndexedDBStorage.SITE_DATA_TABLE);
            const osIndex = objectStore.index('url');

            return new Promise((resolve) => {
                const getRequest = osIndex.get([schemeAndHost, urlPath]);
                getRequest.onerror = (ex) =>  {
                    console.error(`Failed to get site data: ${ex}`)
                };
                getRequest.onsuccess = (event: any) => {
                    let siteData: SiteData | undefined = event.target.result as (SiteData | undefined)
                    if (siteData === undefined) {
                        siteData = {
                            wordEntries: [],
                            missingWords: [],
                        };
                    }

                    resolve(siteData);
                };
            });
        };

        return this.runQuery(query);
    }

     /**
      * Either adds a new SiteData entry to the TABLE_NAME table or updates an existing one
      * if siteData's url index matches an existing entry.
      *
      * @param siteData  data to store in IndexedDB
      * @param url url corresponding to siteData
      */
     storePageData(siteData: SiteData, url: string): Promise<void> {
        const siteDataToStore = siteDataToIDBSiteData(siteData, url);
        if (isEmpty(siteDataToStore)) {
            return this.removePageData(url);
        }

        const query = (db: IDBDatabase): Promise<void> => {
            return new Promise((resolve, reject) => {
                const writeTransaction = db.transaction(IndexedDBStorage.SITE_DATA_TABLE, "readwrite");
                const objectStore = writeTransaction.objectStore(IndexedDBStorage.SITE_DATA_TABLE);

                let request = objectStore.put(siteDataToStore, [siteDataToStore.schemeAndHost, siteDataToStore.urlPath]);
                request.onerror = (err) => {
                    reject(`Unexpected error when saving ${url} ` + err);
                };
                request.onsuccess = () => {
                    resolve();
                };
            });
        };

        return this.runQuery(query);
    }

    /**
     * Returns a list containing each label used to classify a site stored by extension
     *
     * @returns a list of strings, each representing a unique label used to mark at least
     * one of the sites for which we have SiteData for.
     */
    getAllLabels(): Promise<string[]> {
        const query = (db: IDBDatabase): Promise<string[]> => {
            return new Promise((resolve, reject) => {
                const readTransaction = db.transaction(IndexedDBStorage.LABEL_TABLE, 'readonly');
                const objectStore = readTransaction.objectStore(IndexedDBStorage.LABEL_TABLE);
                const osIndex = objectStore.index('label');

                const request = osIndex.openKeyCursor();
                request.onerror = (err) => {
                    reject(`Unexpected error when getting all SiteData:` + err);
                };
                const result: Set<string> = new Set<string>();
                request.onsuccess = (event: any) => {
                    let cursor: IDBCursor | null = event.target.result;
                    if (cursor) {
                        result.add(cursor.key as string);
                        cursor.continue();
                    } else {
                        resolve(Array.from(result));
                    }
                };
            });
        };

        return this.runQuery(query);
    }


    /**
     * Adds entry in IndexedDB associating specified url with a label. If label is only
     * filled with empty spaces or is empty, this is a noop, but a console log is
     * recorded.
     *
     * @param url URL of site
     * @param label string representing a label
     * @returns empty promise
     */
    addLabelEntry(url: string, labelTemp: string): Promise<void> {
        const label = labelTemp.trim();
        const query = (db: IDBDatabase): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                if (label.length === 0 || label.length > MAX_LABEL_LENGTH) {
                    resolve();
                    return;
                }
                const siteData = await this.getPageData(url);
                if (siteData.wordEntries.length === 0 &&
                    siteData.missingWords.length === 0) {
                    resolve();
                    return;
                }

                const schemePathSeparation: string[] = parseURL(url);
                const writeTransaction = db.transaction(IndexedDBStorage.LABEL_TABLE, "readwrite");
                const objectStore = writeTransaction.objectStore(IndexedDBStorage.LABEL_TABLE);

                const obj = {
                    'label': label,
                    'schemeAndHost': schemePathSeparation[0],
                    'urlPath': schemePathSeparation[1],
                };
                const request = objectStore.put(obj);
                request.onerror = (err) => {
                    reject(`Unexpected error when saving ${url} ` + err);
                };
                request.onsuccess = () => {
                    resolve();
                };
            });
        };

        return this.runQuery(query);
    }

    /**
     * Removes association between a url and a label if one exists, otherwise, noop. Does
     * nothing if label is empty (save for white spaces).
     *
     * @param url URL of site
     * @param label string representing a label
     * @returns void promise
     */
    removeLabelEntry(url: string, label: string): Promise<void> {
        label = label.trim();
        const query = (db: IDBDatabase): Promise<void> => {
            return new Promise((resolve, reject) => {
                if (label.length === 0) {
                    resolve();
                }

                const schemePathSeparation: string[] = parseURL(url);
                const writeTransaction = db.transaction(IndexedDBStorage.LABEL_TABLE, "readwrite");
                const objectStore = writeTransaction.objectStore(IndexedDBStorage.LABEL_TABLE);

                const request = objectStore.delete([label, schemePathSeparation[0], schemePathSeparation[1]]);
                request.onerror = (err) => {
                    reject(`Unexpected error when saving ${url} ` + err);
                };
                request.onsuccess = () => {
                    resolve();
                };
            });
        };

        return this.runQuery(query);
    }

    /**
     * Compiles a list of all labels associated with specific url
     *
     * @param url url for which to query for
     * @returns list of all labels associated with specific url
     */
    getLabelsOfSpecificSite(url: string): Promise<string[]> {
        const query = (db: IDBDatabase): Promise<string[]> => {
            return new Promise((resolve, reject) => {
                const schemePathSeparation: string[] = parseURL(url);
                const writeTransaction = db.transaction(IndexedDBStorage.LABEL_TABLE, "readwrite");
                const objectStore = writeTransaction.objectStore(IndexedDBStorage.LABEL_TABLE);

                const labelIndex = objectStore.index('url');
                const request = labelIndex.openKeyCursor(IDBKeyRange.only(schemePathSeparation));
                request.onerror = (err) => {
                    reject(`Unexpected error when querying labels for ${url}: err `);
                };
                const results: string[] = [];
                request.onsuccess = (event: any) => {
                    let cursor: IDBCursor | null = event.target.result;
                    if (cursor) {
                        const key = cursor.primaryKey  as string[];
                        results.push(key[0]);
                        cursor.continue();
                    } else {
                        resolve(results);
                    }
                };
            });
        };

        return this.runQuery(query);
    }

    /**
     * Compiles a list of all URLs associated with specific label
     *
     * @param label label for which to query for
     * @returns list of all urls associated with specific label
     */
    getURLsOfSpecificLabels(label: string): Promise<string[]> {
        const query = (db: IDBDatabase): Promise<string[]> => {
            return new Promise((resolve, reject) => {
                const writeTransaction = db.transaction(IndexedDBStorage.LABEL_TABLE, "readwrite");
                const objectStore = writeTransaction.objectStore(IndexedDBStorage.LABEL_TABLE);

                const labelIndex = objectStore.index('label');
                const request = labelIndex.openKeyCursor(IDBKeyRange.only(label));
                request.onerror = (err) => {
                    reject(`Unexpected error when querying urls for ${label}: ${err}`);
                };
                const results: string[] = [];
                request.onsuccess = (event: any) => {
                    let cursor: IDBCursor | null = event.target.result;
                    if (cursor) {
                        const key = cursor.primaryKey  as string[];
                        const schemeAndHost = key[1];
                        const path = key[2];
                        const url = combineUrl(schemeAndHost, path);
                        results.push(url);
                        cursor.continue();
                    } else {
                        resolve(results);
                    }
                };
            });
        };

        return this.runQuery(query);
    }

    removePageData(url: string): Promise<void> {
        const query = (db: IDBDatabase): Promise<void> => {
            return new Promise((resolve, reject) => {
                const urlAsArray = parseURL(url);
                const schemeAndHost = urlAsArray[0];
                const urlPath = urlAsArray[1];

                const writeTransaction = db.transaction(
                    [IndexedDBStorage.SITE_DATA_TABLE, IndexedDBStorage.LABEL_TABLE],
                    "readwrite"
                );

                const objectStoreSiteData = writeTransaction.objectStore(IndexedDBStorage.SITE_DATA_TABLE);
                const objectStoreLabels = writeTransaction.objectStore(IndexedDBStorage.LABEL_TABLE);
                const labelIndex = objectStoreLabels.index('url');

                objectStoreSiteData.delete([schemeAndHost, urlPath]);
                const labelEntriesCursor = labelIndex.openKeyCursor(IDBKeyRange.only(urlAsArray));
                labelEntriesCursor.onsuccess = (event: any) => {
                    const cursor: IDBCursor | null = event.target.result;
                    if (cursor) {
                        objectStoreLabels.delete(cursor.primaryKey);
                        cursor.continue();
                    }
                };


                writeTransaction.onerror = (err) => {
                    reject(`Unexpected error when saving ${url} ` + err);
                };
                writeTransaction.oncomplete = () => {
                    resolve();
                };
            });
        };

        return this.runQuery(query);
    }

    /**
     * Returns all data stored in non-volatile storage as a JSON-compatible object
     */
    getAllStorageData(): Promise<SiteDataMap> {
        const query = (db: IDBDatabase): Promise<SiteDataMap> => {
            return new Promise((resolve, reject) => {
                const writeTransaction = db.transaction(IndexedDBStorage.SITE_DATA_TABLE, 'readonly');
                const objectStore = writeTransaction.objectStore(IndexedDBStorage.SITE_DATA_TABLE);

                const request = objectStore.getAll();
                request.onerror = (err) => {
                    reject(`Unexpected error when getting all SiteData:` + err);
                };
                request.onsuccess = (event: any) => {
                    const rawData = event.target.result as IDBSiteData[];
                    const result:  {[subject: string]: SiteData} = {};
                    const rawDataPromises = rawData.map(async (x) => {
                        const url = combineUrl(x.schemeAndHost, x.urlPath);
                        const labels: string[] = await this.getLabelsOfSpecificSite(url);
                        if (labels.length !== 0) {
                            x.labels = labels;
                        }
                        result[url] = x;
                    });
                    Promise.all(rawDataPromises).then(() => resolve(result));
                };
            });
        };

        return this.runQuery(query);
    }

    getAllPageUrls(): Promise<string[]> {
        const query = (db: IDBDatabase): Promise<string[]> => {
            return new Promise((resolve, reject) => {
                const writeTransaction = db.transaction(IndexedDBStorage.SITE_DATA_TABLE, 'readonly');
                const objectStore = writeTransaction.objectStore(IndexedDBStorage.SITE_DATA_TABLE);
                const osIndex = objectStore.index('url');

                const request = osIndex.getAllKeys();
                request.onerror = (err) => {
                    reject(`Unexpected error when getting all SiteData:` + err);
                };
                request.onsuccess = (event: any) => {
                    const rawData = event.target.result as string[][];
                    const result: string[] = [];
                    rawData.forEach((x) => {
                        const url = combineUrl(x[0], x[1]);
                        result.push(url);
                    });
                    resolve(result);
                };
            });
        };

        return this.runQuery(query);
    }

    getAllDomains(): Promise<string[]> {
        const query = (db: IDBDatabase): Promise<string[]> => {
            return new Promise((resolve, reject) => {
                const readTransaction = db.transaction(IndexedDBStorage.SITE_DATA_TABLE, 'readonly');
                const objectStore = readTransaction.objectStore(IndexedDBStorage.SITE_DATA_TABLE);
                const osIndex = objectStore.index('schemeAndHost');

                const request = osIndex.openKeyCursor();
                request.onerror = (err) => {
                    reject(`Unexpected error when getting all SiteData:` + err);
                };
                const result: Set<string> = new Set<string>();
                request.onsuccess = (event: any) => {
                    let cursor: IDBCursor | null = event.target.result;
                    if (cursor) {
                        result.add(cursor.key as string);
                        cursor.continue();
                    } else {
                        resolve(Array.from(result));
                    }
                };
            });
        };

        return this.runQuery(query);
    }

    getSeeSiteDataOfDomain(schemeAndHost: string): Promise<SeeSiteData[]> {
        const query = (db: IDBDatabase): Promise<SeeSiteData[]> => {
            return new Promise((resolve, reject) => {
                const readTransaction = db.transaction(IndexedDBStorage.SITE_DATA_TABLE, 'readonly');
                const objectStore = readTransaction.objectStore(IndexedDBStorage.SITE_DATA_TABLE);
                const osIndex = objectStore.index('schemeAndHost');

                const request = osIndex.openCursor(schemeAndHost);
                request.onerror = (err) => {
                    reject(`Unexpected error when getting all SiteData:` + err);
                };

                const result: SeeSiteData[] = [];
                request.onsuccess = (event: any) => {
                    const cursor: IDBCursorWithValue | null = event.target.result;
                    if (cursor) {
                        const value = cursor.value as IDBSiteData;
                        const valueToStore: SeeSiteData = {
                            url: combineUrl(value.schemeAndHost, value.urlPath),
                        };
                        if (value.title !== undefined) {
                            valueToStore.title = value.title;
                        }

                        result.push(valueToStore);
                        cursor.continue();
                    } else {
                        resolve(result);
                    }
                };
            });
        };

        return this.runQuery(query);
    }

    /**
     * Clears all site data from IndexedDB and proceeds to write all data provided by user
     *
     * @param data
     * @returns true if operations succeeded completely and false otherwise
     */
    uploadExtensionData(data: any): Promise<boolean> {
        const query = (db: IDBDatabase): Promise<boolean> => {
            return new Promise((resolve) => {
                const writeTransaction = db.transaction([IndexedDBStorage.SITE_DATA_TABLE, IndexedDBStorage.LABEL_TABLE], "readwrite");
                writeTransaction.onerror = (err) => {
                    console.error(`Unexpected error when deleting all SiteData:` + err);
                    resolve(false);
                };
                writeTransaction.oncomplete = () => {
                    const writeTransaction = db.transaction([IndexedDBStorage.SITE_DATA_TABLE, IndexedDBStorage.LABEL_TABLE], "readwrite");
                    const siteDataObjectStore = writeTransaction.objectStore(IndexedDBStorage.SITE_DATA_TABLE);
                    const labelObjectStore = writeTransaction.objectStore(IndexedDBStorage.LABEL_TABLE);
                    for (let key in data) {
                        if (data.hasOwnProperty(key)) {
                            const element = data[key];
                            if (isSiteData(element)) {
                                const elementToStore = siteDataToIDBSiteData(element, key);
                                if (elementToStore.labels !== undefined) {
                                    const labels = elementToStore.labels;
                                    for (let i = 0; i < labels.length; i++) {
                                        const labelDataEntry = {
                                            'label': labels[i],
                                            'schemeAndHost': elementToStore.schemeAndHost,
                                            'urlPath': elementToStore.urlPath
                                        }
                                        labelObjectStore.put(labelDataEntry);
                                    }
                                }
                                siteDataObjectStore.put(elementToStore, [elementToStore.schemeAndHost, elementToStore.urlPath]);
                            }
                        }
                    }
                    resolve(true);
                };

                let objectStore = writeTransaction.objectStore(IndexedDBStorage.SITE_DATA_TABLE);
                objectStore.clear();
                objectStore = writeTransaction.objectStore(IndexedDBStorage.LABEL_TABLE);
                objectStore.clear();
            });
        };

        return this.runQuery(query);
    }

    getCurrentActivation(): Promise<boolean> {
        throw Error('Current Activation is not stored in IndexedDBStorage')
    }

     setCurrentActivation(isActivated: boolean): Promise<void> {
        throw Error('Current Activation is not stored in IndexedDBStorage')
    }

    getDictionaryData(): Promise<GlobalDictionaryData> {
        throw Error('IndexedDBStorage does not store dictionary data');
    }

    setDictionaryData(gdd: GlobalDictionaryData): Promise<void> {
        throw Error('IndexedDBStorage does not store dictionary data');
    }

    /**
     * @returns value of db connection for this object
     */
    getDB():  IDBDatabase | null {
        return this.db;
    }

    private runQuery<Type>(query: (a: IDBDatabase) => Promise<Type>): Promise<Type>  {
        if (this.db !== null) {
            return query(this.db);
        } else {
            if (this.dbPromise === null) {
                throw Error('IndexedDBStorage does not store dictionary data');
            } else {
                return this.dbPromise.then((value) => query(value));
            }
        }
    }

    /**
     * Creates an object store used to map URLs to the web data pertinent to that page.
     *
     * @param db database connection object with which to create object stores
     */
    private static v1Creation(db: IDBDatabase): void {
        // Create an objectStore for this database
        const objectStore = db.createObjectStore(IndexedDBStorage.SITE_DATA_TABLE, { autoIncrement: true });

        // define what data items the objectStore will contain
        objectStore.createIndex('url', ['schemeAndHost', 'urlPath'], { unique: true });
        objectStore.createIndex('schemeAndHost', 'schemeAndHost', { unique: false });
    }

    /**
     * Creates an object store containing mappings of subjects to URLs, where each entry
     * corresponds of a single subject-url pairing
     *
     * @param db database connection object with which to create object stores
     */
    private static addSubjectTable(db: IDBDatabase): void {
        const objectStore = db.createObjectStore(IndexedDBStorage.LABEL_TABLE,
            { keyPath: ['label', 'schemeAndHost', 'urlPath'] }
        );
        objectStore.createIndex('url', ['schemeAndHost', 'urlPath'], { unique: false });
        objectStore.createIndex('label', 'label', { unique: false });
    }
}

/**
 * Constructs and IndexedDBStorage and initializes it, returning a Promise that evaluates
 * to a IndexedDBStorage object if successful.
 *
 * @param ls NonVolatileBrowserStorage object from which to obtain previously-stored data
 * @returns IndexedDBStorage that will eventually complete calling its set up function
 */
 export async function getIndexedDBStorage(ls?: LocalStorage): Promise<IndexedDBStorage> {
    const nonVolatileStorage =  new IndexedDBStorage();
    await nonVolatileStorage.setUp(ls);
    return nonVolatileStorage;
}
