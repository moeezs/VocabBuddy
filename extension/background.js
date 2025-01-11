(()=>{"use strict";function e(e){const t=e;return null!=t&&void 0!==t.wordEntries&&void 0!==t.missingWords&&(void 0===t.highlightOptions||function(e){const t=e;return null!=t&&void 0!==t.fontColor&&void 0!==t.backgroundColor}(t.highlightOptions))}function t(e){return 0===e.wordEntries.length&&0===e.missingWords.length}function n(e){let t=e;return null!=t&&void 0!==t.language&&void 0!==t.index}function i(e){let t=e;return null!=t&&void 0!==t.name&&void 0!==t.url}var o=function(e,t,n,i){return new(n||(n=Promise))((function(o,r){function a(e){try{l(i.next(e))}catch(e){r(e)}}function s(e){try{l(i.throw(e))}catch(e){r(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}l((i=i.apply(e,t||[])).next())}))};class r{constructor(e){this.source=e}getLanguages(){return o(this,void 0,void 0,(function*(){return function(e){let t=e.languagesToResources;return Object.getOwnPropertyNames(t)}(yield this.source.getDictionaryData())}))}getDictionariesOfLanguage(e){return o(this,void 0,void 0,(function*(){let t=(yield this.source.getDictionaryData()).languagesToResources;return void 0===t[e]?[]:t[e]}))}getDictionaryFromIdentifierHelper(e,t){let n=e.languagesToResources;if(void 0===t.language||t.index<0||null==n[t.language])return{name:"",url:""};let i=n[t.language];return t.index<0||t.index>=i.length?{name:"",url:""}:i[t.index]}getDictionaryFromIdentifier(e){return o(this,void 0,void 0,(function*(){let t=yield this.source.getDictionaryData();return this.getDictionaryFromIdentifierHelper(t,e)}))}getCurrentDictionaryId(){return o(this,void 0,void 0,(function*(){return(yield this.source.getDictionaryData()).currentDictionary}))}getWordSearchURL(e){return o(this,void 0,void 0,(function*(){const t=yield this.source.getDictionaryData();return this.getDictionaryFromIdentifierHelper(t,t.currentDictionary).url.replace(r.wordURLPlaceHolderRegex,e)}))}setCurrentDictionary(e){return o(this,void 0,void 0,(function*(){let t=yield this.source.getDictionaryData();t.currentDictionary=e,this.source.setDictionaryData(t)}))}removeDictionary(e){return o(this,void 0,void 0,(function*(){try{const t=e.language,n=e.index,i=yield this.source.getDictionaryData(),o=i.languagesToResources,r=o[t];return!(null==r||n<0||n>=r.length||(o[t].splice(n,1),i.currentDictionary.language===e.language&&(i.currentDictionary.index===e.index?(i.currentDictionary.language="",i.currentDictionary.index=-1):i.currentDictionary.index>e.index&&i.currentDictionary.index--),0===o[t].length&&delete o[t],this.source.setDictionaryData(i),0))}catch(e){return console.error(e),!1}}))}addDictionary(e,t){return o(this,void 0,void 0,(function*(){const n=yield this.source.getDictionaryData();0===Object.keys(n.languagesToResources).length&&(n.currentDictionary={language:t,index:0}),void 0===n.languagesToResources[t]&&(n.languagesToResources[t]=[]),n.languagesToResources[t].push(e),this.source.setDictionaryData(n)}))}modifyExistingDictionary(e,t,n){return o(this,void 0,void 0,(function*(){if(e.language===t){let t=yield this.source.getDictionaryData(),i=t.languagesToResources,o=i[e.language];if(null===o||e.index<0||e.index>=o.length)return void console.error(`Bad data for ${i}: ${e.language}, ${e.index}`);o[e.index]=n,this.source.setDictionaryData(t)}else{let i=yield this.source.getDictionaryData();const o=i.currentDictionary.language,r=i.currentDictionary.index;if(yield this.removeDictionary(e)){i=yield this.source.getDictionaryData();let a=i.languagesToResources;a.hasOwnProperty(t)?a[t].push(n):a[t]=[n],o===e.language&&(r===e.index?(i.currentDictionary.language=t,i.currentDictionary.index=a[t].length-1):r>e.index&&(i.currentDictionary.index=r-1)),this.source.setDictionaryData(i)}}}))}}function a(e){let t,n;e.length>0&&"/"===e.charAt(e.length-1)&&(e=e.substring(0,e.length-1));const i=e.indexOf("://"),o=e.indexOf("/",i+3);return-1===o?(t=e,n=""):(t=e.substring(0,o),n=e.substring(o)),[t,n]}function s(e,t){return""===t?e:e+t}r.wordURLPlaceHolder="{word}",r.wordURLPlaceHolderRegex=new RegExp(r.wordURLPlaceHolder,"g");var l,c=function(e,t,n,i){return new(n||(n=Promise))((function(o,r){function a(e){try{l(i.next(e))}catch(e){r(e)}}function s(e){try{l(i.throw(e))}catch(e){r(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}l((i=i.apply(e,t||[])).next())}))};!function(e){e[e.ActivationStateChange=0]="ActivationStateChange",e[e.DeleteChosenHighlight=1]="DeleteChosenHighlight",e[e.StartQuiz=2]="StartQuiz",e[e.ChangeHighlightStyle=3]="ChangeHighlightStyle"}(l||(l={}));var d,u=function(e,t,n,i){return new(n||(n=Promise))((function(o,r){function a(e){try{l(i.next(e))}catch(e){r(e)}}function s(e){try{l(i.throw(e))}catch(e){r(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}l((i=i.apply(e,t||[])).next())}))};class g{constructor(e){this.setUpCMsCalled=!1,this.storage=e}setUpContextMenus(){return u(this,void 0,void 0,(function*(){if(this.setUpCMsCalled)return void console.warn("setUpContextMenus called again");this.setUpCMsCalled=!0;const e=yield this.storage.getCurrentActivation();this.setUpContextMenuGraphicalComponents(e),this.setUpContextMenuListeners()}))}setUpContextMenuGraphicalComponents(e){chrome.contextMenus.create({id:g.activationID,title:e?g.deactivateActivationCMTitle:g.activateActivationCMTitle,contexts:["all"]}),chrome.contextMenus.create({id:"separator-1",type:"separator",contexts:["all"]}),chrome.contextMenus.create({id:g.quizID,title:g.quizCMTitle,contexts:["all"]}),chrome.contextMenus.create({id:"separator-2",type:"separator",contexts:["all"]}),chrome.contextMenus.create({id:g.changeHighlightStylingID,title:g.changeHighlightStyleingTitle,contexts:["all"]}),chrome.contextMenus.create({id:"separator-3",type:"separator",contexts:["all"]}),chrome.contextMenus.create({id:g.deleteHighlightsID,title:g.deleteHighlightCMTitle,contexts:["all"],visible:!1})}specificTabSend(e,t,n){return u(this,void 0,void 0,(function*(){if(void 0===e||void 0===e.id)return void console.error(n);const i={messageType:t};yield chrome.tabs.sendMessage(e.id,i)}))}setUpContextMenuListeners(){chrome.contextMenus.onClicked.addListener(((e,t)=>{switch(e.menuItemId){case g.activationID:return new Promise((e=>u(this,void 0,void 0,(function*(){const t=!(yield this.storage.getCurrentActivation());this.storage.setCurrentActivation(t),this.updateContextMenuBasedOnActivation(t);const n=yield chrome.tabs.query({}),i={messageType:l.ActivationStateChange,payload:{newActivatedState:t}};for(let e of n)if(void 0!==e.id)try{yield chrome.tabs.sendMessage(e.id,i)}catch(t){console.warn(`Failed to send message to tab ${e.index}-${e.title}: ${t}`)}e()}))));case g.deleteHighlightsID:return this.specificTabSend(t,l.DeleteChosenHighlight,"delete highlights triggered without valid tab");case g.quizID:return this.specificTabSend(t,l.StartQuiz,"quiz triggered without active tab");case g.changeHighlightStylingID:return this.specificTabSend(t,l.ChangeHighlightStyle,"highlight change triggered without active tab");default:return console.error(`unexpected menu item ${e.menuItemId}`),Promise.resolve()}}))}exposeDeleteContextMenu(){chrome.contextMenus.update(g.deleteHighlightsID,{visible:!0})}hideDeleteContextMenu(){chrome.contextMenus.update(g.deleteHighlightsID,{visible:!1})}updateContextMenuBasedOnActivation(e){let t=e?g.deactivateActivationCMTitle:g.activateActivationCMTitle;chrome.contextMenus.update(g.activationID,{title:t})}}function h(e){let t=e;return null!=t&&void 0!==t.label&&void 0!==t.url}function y(e){return null!=e&&void 0!==e.url}g.activationID="activation",g.quizID="quiz",g.deleteHighlightsID="delete_highlight",g.changeHighlightStylingID="highlight-style",g.activateActivationCMTitle="🟢   Activate",g.deactivateActivationCMTitle="🔴  Deactivate",g.quizCMTitle="🧠  Quiz",g.deleteHighlightCMTitle="❌  Delete Highlighted Text",g.changeHighlightStyleingTitle="🖌 Change Highlight Style",function(e){e[e.DictsOfLang=0]="DictsOfLang",e[e.GetCurrentDictionary=1]="GetCurrentDictionary",e[e.SetCurrentDictionary=2]="SetCurrentDictionary",e[e.AddNewDictionary=3]="AddNewDictionary",e[e.GetExistingDictionary=4]="GetExistingDictionary",e[e.UpdateExistingDictionary=5]="UpdateExistingDictionary",e[e.DeleteExitingDictionary=6]="DeleteExitingDictionary",e[e.GetLanguages=7]="GetLanguages",e[e.SearchWordURL=8]="SearchWordURL",e[e.StorePageData=9]="StorePageData",e[e.DeletePageData=10]="DeletePageData",e[e.GetPageData=11]="GetPageData",e[e.GetCurrentActivation=12]="GetCurrentActivation",e[e.SetCurrentActivation=13]="SetCurrentActivation",e[e.ShowDeleteHighlightsCM=14]="ShowDeleteHighlightsCM",e[e.HideDeleteHighlightsCM=15]="HideDeleteHighlightsCM",e[e.GetAllDomains=16]="GetAllDomains",e[e.GetSeeSiteData=17]="GetSeeSiteData",e[e.GetAllExtensionData=18]="GetAllExtensionData",e[e.LoadExtensionData=19]="LoadExtensionData",e[e.GetLabelsForSite=20]="GetLabelsForSite",e[e.GetURLsForLabel=21]="GetURLsForLabel",e[e.AddLabelEntry=22]="AddLabelEntry",e[e.RemoveLabelEntry=23]="RemoveLabelEntry",e[e.GetAllLabels=24]="GetAllLabels"}(d||(d={}));var D=function(e,t,n,i){return new(n||(n=Promise))((function(o,r){function a(e){try{l(i.next(e))}catch(e){r(e)}}function s(e){try{l(i.throw(e))}catch(e){r(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}l((i=i.apply(e,t||[])).next())}))};const v="vocab-forager";function p(e,t){const n=a(t),i=n[0],o=n[1],r=e;return r.schemeAndHost=i,r.urlPath=o,r}class A{constructor(){this.db=null,this.dbPromise=null}setUp(e){return this.dbPromise=new Promise(((t,n)=>{const i=indexedDB.open(v,2);i.onerror=function(e){n("Problem opening DB: "+e)};let o=!1;i.onupgradeneeded=e=>{console.log(`Upgrading ${v} to ${e.newVersion} from ${e.oldVersion}`),o=e.oldVersion<=0;const t=e.target.result;for(let n=Math.max(0,e.oldVersion)+1;n<=e.newVersion;n++)console.log(`Performing IndexedDB Transform ${n}`),(0,A.TRANSFORMS[n])(t)},i.onsuccess=n=>D(this,void 0,void 0,(function*(){if(this.db=n.target.result,console.log("this.db set"),o&&void 0!==e){console.log("Transferring any old localStorage http data to indexedDB");const t=yield e.getAllStorageData();yield this.uploadExtensionData(t),console.log("Loading Completed, Removing useless data from localStorage");const n=yield e.getAllPageUrls();for(let t=0;t<n.length;t++)e.removePageData(n[t])}t(this.db)}))})),this.dbPromise}getPageData(e){return this.runQuery((t=>{const n=a(e),i=n[0],o=n[1],r=t.transaction(A.SITE_DATA_TABLE,"readonly").objectStore(A.SITE_DATA_TABLE).index("url");return new Promise((e=>{const t=r.get([i,o]);t.onerror=e=>{console.error(`Failed to get site data: ${e}`)},t.onsuccess=t=>{let n=t.target.result;void 0===n&&(n={wordEntries:[],missingWords:[]}),e(n)}}))}))}storePageData(e,n){const i=p(e,n);return t(i)?this.removePageData(n):this.runQuery((e=>new Promise(((t,o)=>{let r=e.transaction(A.SITE_DATA_TABLE,"readwrite").objectStore(A.SITE_DATA_TABLE).put(i,[i.schemeAndHost,i.urlPath]);r.onerror=e=>{o(`Unexpected error when saving ${n} `+e)},r.onsuccess=()=>{t()}}))))}getAllLabels(){return this.runQuery((e=>new Promise(((t,n)=>{const i=e.transaction(A.LABEL_TABLE,"readonly").objectStore(A.LABEL_TABLE).index("label").openKeyCursor();i.onerror=e=>{n("Unexpected error when getting all SiteData:"+e)};const o=new Set;i.onsuccess=e=>{let n=e.target.result;n?(o.add(n.key),n.continue()):t(Array.from(o))}}))))}addLabelEntry(e,t){const n=t.trim();return this.runQuery((i=>new Promise(((o,r)=>D(this,void 0,void 0,(function*(){if(0===n.length||n.length>64)return console.log(`Attempted to add label [${t}] to ${e}, it has either 0 or more than 64 characters`),void o();const s=yield this.getPageData(e);if(0===s.wordEntries.length&&0===s.missingWords.length)return console.log(`Cannot add label entry ${n} ${e} since no site data is present`),void o();const l=a(e),c=i.transaction(A.LABEL_TABLE,"readwrite").objectStore(A.LABEL_TABLE),d={label:n,schemeAndHost:l[0],urlPath:l[1]},u=c.put(d);u.onerror=t=>{r(`Unexpected error when saving ${e} `+t)},u.onsuccess=()=>{o()}}))))))}removeLabelEntry(e,t){return t=t.trim(),this.runQuery((n=>new Promise(((i,o)=>{0===t.length&&(console.log(`Attempted to add empty subject to ${e}`),i());const r=a(e),s=n.transaction(A.LABEL_TABLE,"readwrite").objectStore(A.LABEL_TABLE).delete([t,r[0],r[1]]);s.onerror=t=>{o(`Unexpected error when saving ${e} `+t)},s.onsuccess=()=>{i()}}))))}getLabelsOfSpecificSite(e){return this.runQuery((t=>new Promise(((n,i)=>{const o=a(e),r=t.transaction(A.LABEL_TABLE,"readwrite").objectStore(A.LABEL_TABLE).index("url").openKeyCursor(IDBKeyRange.only(o));r.onerror=t=>{i(`Unexpected error when querying labels for ${e}: err `)};const s=[];r.onsuccess=e=>{let t=e.target.result;if(t){const e=t.primaryKey;s.push(e[0]),t.continue()}else n(s)}}))))}getURLsOfSpecificLabels(e){return this.runQuery((t=>new Promise(((n,i)=>{const o=t.transaction(A.LABEL_TABLE,"readwrite").objectStore(A.LABEL_TABLE).index("label").openKeyCursor(IDBKeyRange.only(e));o.onerror=t=>{i(`Unexpected error when querying urls for ${e}: ${t}`)};const r=[];o.onsuccess=e=>{let t=e.target.result;if(t){const e=t.primaryKey,n=s(e[1],e[2]);r.push(n),t.continue()}else n(r)}}))))}removePageData(e){return this.runQuery((t=>new Promise(((n,i)=>{const o=a(e),r=o[0],s=o[1],l=t.transaction([A.SITE_DATA_TABLE,A.LABEL_TABLE],"readwrite"),c=l.objectStore(A.SITE_DATA_TABLE),d=l.objectStore(A.LABEL_TABLE),u=d.index("url");c.delete([r,s]),u.openKeyCursor(IDBKeyRange.only(o)).onsuccess=e=>{const t=e.target.result;t&&(d.delete(t.primaryKey),t.continue())},l.onerror=t=>{i(`Unexpected error when saving ${e} `+t)},l.oncomplete=()=>{n()}}))))}getAllStorageData(){return this.runQuery((e=>new Promise(((t,n)=>{const i=e.transaction(A.SITE_DATA_TABLE,"readonly").objectStore(A.SITE_DATA_TABLE).getAll();i.onerror=e=>{n("Unexpected error when getting all SiteData:"+e)},i.onsuccess=e=>{const n=e.target.result,i={},o=n.map((e=>D(this,void 0,void 0,(function*(){const t=s(e.schemeAndHost,e.urlPath),n=yield this.getLabelsOfSpecificSite(t);0!==n.length&&(e.labels=n),i[t]=e}))));Promise.all(o).then((()=>t(i)))}}))))}getAllPageUrls(){return this.runQuery((e=>new Promise(((t,n)=>{const i=e.transaction(A.SITE_DATA_TABLE,"readonly").objectStore(A.SITE_DATA_TABLE).index("url").getAllKeys();i.onerror=e=>{n("Unexpected error when getting all SiteData:"+e)},i.onsuccess=e=>{const n=e.target.result,i=[];n.forEach((e=>{const t=s(e[0],e[1]);i.push(t)})),t(i)}}))))}getAllDomains(){return this.runQuery((e=>new Promise(((t,n)=>{const i=e.transaction(A.SITE_DATA_TABLE,"readonly").objectStore(A.SITE_DATA_TABLE).index("schemeAndHost").openKeyCursor();i.onerror=e=>{n("Unexpected error when getting all SiteData:"+e)};const o=new Set;i.onsuccess=e=>{let n=e.target.result;n?(o.add(n.key),n.continue()):t(Array.from(o))}}))))}getSeeSiteDataOfDomain(e){return this.runQuery((t=>new Promise(((n,i)=>{const o=t.transaction(A.SITE_DATA_TABLE,"readonly").objectStore(A.SITE_DATA_TABLE).index("schemeAndHost").openCursor(e);o.onerror=e=>{i("Unexpected error when getting all SiteData:"+e)};const r=[];o.onsuccess=e=>{const t=e.target.result;if(t){const e=t.value,n={url:s(e.schemeAndHost,e.urlPath)};void 0!==e.title&&(n.title=e.title),r.push(n),t.continue()}else n(r)}}))))}uploadExtensionData(t){return this.runQuery((n=>new Promise((i=>{const o=n.transaction([A.SITE_DATA_TABLE,A.LABEL_TABLE],"readwrite");o.onerror=e=>{console.error("Unexpected error when deleting all SiteData:"+e),i(!1)},o.oncomplete=()=>{const o=n.transaction([A.SITE_DATA_TABLE,A.LABEL_TABLE],"readwrite"),r=o.objectStore(A.SITE_DATA_TABLE),a=o.objectStore(A.LABEL_TABLE);for(let n in t)if(t.hasOwnProperty(n)){const i=t[n];if(e(i)){const e=p(i,n);if(void 0!==e.labels){const t=e.labels;for(let n=0;n<t.length;n++){const i={label:t[n],schemeAndHost:e.schemeAndHost,urlPath:e.urlPath};a.put(i)}}r.put(e,[e.schemeAndHost,e.urlPath])}}i(!0)};let r=o.objectStore(A.SITE_DATA_TABLE);r.clear(),r=o.objectStore(A.LABEL_TABLE),r.clear()}))))}getCurrentActivation(){throw Error("Current Activation is not stored in IndexedDBStorage")}setCurrentActivation(e){throw Error("Current Activation is not stored in IndexedDBStorage")}getDictionaryData(){throw Error("IndexedDBStorage does not store dictionary data")}setDictionaryData(e){throw Error("IndexedDBStorage does not store dictionary data")}getDB(){return this.db}runQuery(e){if(null!==this.db)return e(this.db);if(null===this.dbPromise)throw Error("IndexedDBStorage does not store dictionary data");return this.dbPromise.then((t=>e(t)))}static v1Creation(e){console.log("Adding siteData table");const t=e.createObjectStore(A.SITE_DATA_TABLE,{autoIncrement:!0});t.createIndex("url",["schemeAndHost","urlPath"],{unique:!0}),t.createIndex("schemeAndHost","schemeAndHost",{unique:!1})}static addSubjectTable(e){console.log("Adding label table");const t=e.createObjectStore(A.LABEL_TABLE,{keyPath:["label","schemeAndHost","urlPath"]});t.createIndex("url",["schemeAndHost","urlPath"],{unique:!1}),t.createIndex("label","label",{unique:!1})}}A.SITE_DATA_TABLE="site-data",A.LABEL_TABLE="label-data",A.TRANSFORMS=[()=>{console.error("SHOULD NOT BE HERE")},A.v1Creation,A.addSubjectTable];var f=function(e,t,n,i){return new(n||(n=Promise))((function(o,r){function a(e){try{l(i.next(e))}catch(e){r(e)}}function s(e){try{l(i.throw(e))}catch(e){r(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}l((i=i.apply(e,t||[])).next())}))};const m=new class{constructor(e,t){this.tabIdKey="tab_id",this.isActivatedKey=e,this.dictionaryKey=t}getFromLS(e){return c(this,void 0,void 0,(function*(){const t=yield chrome.storage.local.get(e);return t.hasOwnProperty(e)?t[e]:null}))}setInLS(e,t){const n={[e]:t};return chrome.storage.local.set(n)}removeFromLS(e){chrome.storage.local.remove(e)}getAllEntireLS(){return c(this,void 0,void 0,(function*(){return chrome.storage.local.get(null)}))}getCurrentActivation(){return c(this,void 0,void 0,(function*(){let e=!1,t=yield this.getFromLS(this.isActivatedKey);return null===t?yield this.setCurrentActivation(e):e=t,e}))}setCurrentActivation(e){return this.setInLS(this.isActivatedKey,e)}storePageData(e,n){t(e)?this.removeFromLS(n):this.setInLS(n,e)}removePageData(e){this.removeFromLS(e)}getAllStorageData(){return this.getAllEntireLS()}getAllPageUrls(){return c(this,void 0,void 0,(function*(){let e=yield this.getAllEntireLS();const t=[];for(let n in e)this.isURL(n)&&t.push(n);return t}))}getAllDomains(){return c(this,void 0,void 0,(function*(){const e=yield this.getAllPageUrls(),t=new Set;return e.forEach((e=>t.add(a(e)[0]))),Array.from(t)}))}getSeeSiteDataOfDomain(e){return c(this,void 0,void 0,(function*(){const t=(yield this.getAllPageUrls()).filter((t=>a(t)[0]===e)).map((e=>c(this,void 0,void 0,(function*(){const t=yield this.getPageData(e),n={url:e};return void 0!==t.title&&(n.title=t.title),n}))));return(()=>c(this,void 0,void 0,(function*(){return yield Promise.all(t)})))()}))}getPageData(e){return c(this,void 0,void 0,(function*(){let t=yield this.getFromLS(e);return null===t?{wordEntries:[],missingWords:[]}:t}))}getDictionaryData(){return c(this,void 0,void 0,(function*(){let e=yield this.getFromLS(this.dictionaryKey);return null===e?{languagesToResources:{},currentDictionary:{language:"",index:-1}}:e}))}setDictionaryData(e){return this.setInLS(this.dictionaryKey,e)}uploadExtensionData(e){return c(this,void 0,void 0,(function*(){return yield chrome.storage.local.clear(),yield chrome.storage.local.set(e),this.getCurrentActivation()}))}getTabId(){return c(this,void 0,void 0,(function*(){return yield this.getFromLS(this.tabIdKey)}))}setTabId(e){return c(this,void 0,void 0,(function*(){return this.setInLS(this.tabIdKey,e)}))}isURL(e){return e!==this.dictionaryKey&&e!==this.isActivatedKey&&e!==this.tabIdKey}}("is_activated","dicts"),L=new r(m),b=new g(m);function S(e,t){console.error(`unexpected ${e}: ${JSON.stringify(t)}`)}function x(t){return(o,r,a)=>f(this,void 0,void 0,(function*(){if(!function(e){let t=e;return null!=t&&void 0!==t.messageType&&void 0!==t.payload}(o))return S("request structure",o),!1;switch(console.log(`REQUEST TO BACKGROUND MADE: ${d[o.messageType]}`),o.messageType){case d.DictsOfLang:if(null!=(r=o.payload)&&void 0!==r.language){const e=yield L.getDictionariesOfLanguage(o.payload.language);a(e)}else S("payload",o.payload);break;case d.GetCurrentDictionary:{const e=yield L.getCurrentDictionaryId();a(e);break}case d.GetLanguages:{const e=yield L.getLanguages();a(e);break}case d.SetCurrentDictionary:n(o.payload)?(yield L.setCurrentDictionary(o.payload),a()):S("payload",o.payload);break;case d.GetExistingDictionary:if(n(o.payload)){const e=yield L.getDictionaryFromIdentifier(o.payload);a(e)}else S("payload",o.payload);break;case d.UpdateExistingDictionary:if(function(e){let t=e;return null!=t&&void 0!==t.language&&n(t.index)&&i(t.content)}(o.payload)){const e=o.payload.content,t=o.payload.index,n=o.payload.language;yield L.modifyExistingDictionary(t,n,e),a()}else S("payload",o.payload);break;case d.AddNewDictionary:if(function(e){let t=e;return null!=t&&void 0!==t.lang&&i(t.dict)}(o.payload)){const e=o.payload.dict,t=o.payload.lang;yield L.addDictionary(e,t),a()}else S("payload",o.payload);break;case d.DeleteExitingDictionary:if(n(o.payload)){const e=yield L.removeDictionary(o.payload);a(e)}else S("payload",o.payload);break;case d.SearchWordURL:if(function(e){return null!=e&&void 0!==e.word}(o.payload)){const e=yield L.getWordSearchURL(o.payload.word);yield function(e){return f(this,void 0,void 0,(function*(){const t=yield m.getTabId();if(null!==t&&(yield function(e,t){return f(this,void 0,void 0,(function*(){try{return(yield chrome.tabs.get(e)).id===t}catch(e){return!1}}))}(t,t))){const n={active:!0,url:e};yield chrome.tabs.update(t,n)}else yield function(e){const t={active:!0,url:e};return new Promise(((n,i)=>f(this,void 0,void 0,(function*(){yield chrome.tabs.create(t).then((t=>f(this,void 0,void 0,(function*(){t.id?(yield m.setTabId(t.id),n()):(console.error(`Created new tab without id for url: ${e}`),i())}))))}))))}(e)}))}(e)}else S("payload",o.payload);break;case d.StorePageData:if(function(t){let n=t;return null!=n&&void 0!==n.url&&e(n.data)}(o.payload)){const e=o.payload.data,n=o.payload.url;yield t.storePageData(e,n)}else S("payload",o.payload);break;case d.GetPageData:if(y(o.payload)){const e=yield t.getPageData(o.payload.url);a(e)}else S("payload",o.payload);break;case d.DeletePageData:y(o.payload)?yield t.removePageData(o.payload.url):S("payload",o.payload);break;case d.GetCurrentActivation:{const e=yield m.getCurrentActivation();a(e);break}case d.SetCurrentActivation:!function(e){return null!=e&&void 0!==e.isActivated}(o.payload)?S("payload",o.payload):(yield m.setCurrentActivation(o.payload.isActivated),b.updateContextMenuBasedOnActivation(o.payload.isActivated));break;case d.ShowDeleteHighlightsCM:b.exposeDeleteContextMenu(),a();break;case d.HideDeleteHighlightsCM:b.hideDeleteContextMenu(),a();break;case d.GetAllDomains:{const e=yield t.getAllDomains();a(e);break}case d.GetLabelsForSite:if(y(o.payload)){const e=yield t.getLabelsOfSpecificSite(o.payload.url);a(e)}else S("payload",o.payload);break;case d.GetURLsForLabel:if(function(e){return null!=e&&void 0!==e.label}(o.payload)){const e=yield t.getURLsOfSpecificLabels(o.payload.label),n=e.map((e=>t.getPageData(e))),i=[];for(let t=0;t<e.length;t++){const o=yield n[t],r={url:e[t],title:o.title};i.push(r)}a(i)}else S("payload",o.payload);break;case d.AddLabelEntry:h(o.payload)?(yield t.addLabelEntry(o.payload.url,o.payload.label),a()):S("payload",o.payload);break;case d.RemoveLabelEntry:h(o.payload)?(yield t.removeLabelEntry(o.payload.url,o.payload.label),a()):S("payload",o.payload);break;case d.GetAllLabels:{const e=yield t.getAllLabels();a(e);break}case d.GetSeeSiteData:if(function(e){return null!=e&&void 0!==e.schemeAndHost}(o.payload)){const e=yield t.getSeeSiteDataOfDomain(o.payload.schemeAndHost);a(e)}else S("payload",o.payload);break;case d.GetAllExtensionData:{const e=m.getAllStorageData(),n=t.getAllStorageData(),i=yield e,o=yield n,r=Object.assign(Object.assign({},i),o);a(r);break}case d.LoadExtensionData:if(function(e){return null!=e&&void 0!==e.data}(o.payload)){const e={};e[m.isActivatedKey]=o.payload.data[m.isActivatedKey],e[m.dictionaryKey]=o.payload.data[m.dictionaryKey];const n=yield m.uploadExtensionData(e);b.updateContextMenuBasedOnActivation(n),yield t.uploadExtensionData(o.payload.data)}else S("payload",o.payload);break;default:S("messageType",o.messageType)}var r;return!0}))}let E;const T=function(e){return D(this,void 0,void 0,(function*(){const t=new A;return yield t.setUp(e),t}))}(m).then((e=>{E=e;const t=x(e);var n;chrome.runtime.onMessage.addListener((n=t,(e,t,i)=>(n(e,t,i),!0)))}));b.setUpContextMenus(),Promise.all([T,b])})();