(() => {
    "use strict";
    var e;
    !function(e) {
        e[e.DictsOfLang = 0] = "DictsOfLang",
        e[e.GetCurrentDictionary = 1] = "GetCurrentDictionary",
        e[e.SetCurrentDictionary = 2] = "SetCurrentDictionary",
        e[e.AddNewDictionary = 3] = "AddNewDictionary",
        e[e.GetExistingDictionary = 4] = "GetExistingDictionary",
        e[e.UpdateExistingDictionary = 5] = "UpdateExistingDictionary",
        e[e.DeleteExitingDictionary = 6] = "DeleteExitingDictionary",
        e[e.GetLanguages = 7] = "GetLanguages",
        e[e.SearchWordURL = 8] = "SearchWordURL",
        e[e.StorePageData = 9] = "StorePageData",
        e[e.DeletePageData = 10] = "DeletePageData",
        e[e.GetPageData = 11] = "GetPageData",
        e[e.GetCurrentActivation = 12] = "GetCurrentActivation",
        e[e.SetCurrentActivation = 13] = "SetCurrentActivation",
        e[e.ShowDeleteHighlightsCM = 14] = "ShowDeleteHighlightsCM",
        e[e.HideDeleteHighlightsCM = 15] = "HideDeleteHighlightsCM",
        e[e.GetAllDomains = 16] = "GetAllDomains",
        e[e.GetSeeSiteData = 17] = "GetSeeSiteData",
        e[e.GetAllExtensionData = 18] = "GetAllExtensionData",
        e[e.LoadExtensionData = 19] = "LoadExtensionData",
        e[e.GetLabelsForSite = 20] = "GetLabelsForSite",
        e[e.GetURLsForLabel = 21] = "GetURLsForLabel",
        e[e.AddLabelEntry = 22] = "AddLabelEntry",
        e[e.RemoveLabelEntry = 23] = "RemoveLabelEntry",
        e[e.GetAllLabels = 24] = "GetAllLabels"
    }(e || (e = {}));

    const t = chrome.runtime.getURL("web_pages/popup.html");
    const r = {
        Arabic: "https://en.bab.la/dictionary/arabic-english/{word}",
        Chinese: "https://en.bab.la/dictionary/chinese-english/{word}",
        Danish: "https://en.bab.la/dictionary/danish-english/{word}",
        Dutch: "https://en.bab.la/dictionary/dutch-english/{word}",
        Finnish: "https://en.bab.la/dictionary/finnish-english/{word}",
        French: "https://en.bab.la/dictionary/french-english/{word}",
        German: "https://en.bab.la/dictionary/german-english/{word}",
        Greek: "https://en.bab.la/dictionary/greek-english/{word}",
        Hindi: "https://en.bab.la/dictionary/hindi-english/{word}",
        Indonesian: "https://en.bab.la/dictionary/indonesian-english/{word}",
        Italian: "https://en.bab.la/dictionary/italian-english/{word}",
        Japanese: "https://en.bab.la/dictionary/japanese-english/{word}",
        Korean: "https://en.bab.la/dictionary/korean-english/{word}",
        Norwegian: "https://en.bab.la/dictionary/norwegian-english/{word}",
        Polish: "https://en.bab.la/dictionary/polish-english/{word}",
        Portuguese: "https://en.bab.la/dictionary/portuguese-english/{word}",
        Russian: "https://en.bab.la/dictionary/russian-english/{word}",
        Spanish: "https://en.bab.la/dictionary/spanish-english/{word}",
        Swedish: "https://en.bab.la/dictionary/swedish-english/{word}",
        Turkish: "https://en.bab.la/dictionary/turkish-english/{word}",
        Vietnamese: "https://en.bab.la/dictionary/vietnamese-english/{word}"
    };

    fetch(chrome.runtime.getURL("cross-page-assets/banner.html")).then((function(e) {
        return n = this,
        a = void 0,
        o = function*() {
            const n = yield e.text();
            document.getElementById("banner_anchor").innerHTML += n,
            window.location.href !== t && (document.getElementById("banner_text").onclick = function() {
                const e = chrome.runtime.getURL("web_pages/index.html");
                window.location.href = e
            })
        },
        new ((i = void 0) || (i = Promise))((function(e, t) {
            function r(e) {
                try {
                    l(o.next(e))
                } catch (e) {
                    t(e)
                }
            }
            function c(e) {
                try {
                    l(o.throw(e))
                } catch (e) {
                    t(e)
                }
            }
            function l(t) {
                var n;
                t.done ? e(t.value) : (n = t.value,
                n instanceof i ? n : new i((function(e) {
                    e(n)
                }
                ))).then(r, c)
            }
            l((o = o.apply(n, a || [])).next())
        }
        ));
        var n, a, i, o
    }));

    function sendNewDictionary(t, n) {
        const a = {
            messageType: e.AddNewDictionary,
            payload: {
                dict: t,
                lang: n
            }
        };
        chrome.runtime.sendMessage(a)
    }

    function showStatus(e) {
        const t = `Saved Dictionary ${e}`,
        n = document.getElementById("show-status");
        n.textContent = t,
        n.style.display = "inherit"
    }

    document.getElementById("submit").addEventListener("click", (() => {
        const t = document.getElementById("lang").value;
        if (!t) {
            alert("Please select a language");
            return;
        }
        const n = document.getElementById("name").value;
        if (!n) {
            alert("Please enter a dictionary name");
            return;
        }
        const a = {
            name: n,
            url: r[t]
        };
        sendNewDictionary(a, t);
        showStatus(a.name);
    }))
})();