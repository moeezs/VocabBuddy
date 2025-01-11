// (()=>{"use strict";var e;!function(e){e[e.DictsOfLang=0]="DictsOfLang",e[e.GetCurrentDictionary=1]="GetCurrentDictionary",e[e.SetCurrentDictionary=2]="SetCurrentDictionary",e[e.AddNewDictionary=3]="AddNewDictionary",e[e.GetExistingDictionary=4]="GetExistingDictionary",e[e.UpdateExistingDictionary=5]="UpdateExistingDictionary",e[e.DeleteExitingDictionary=6]="DeleteExitingDictionary",e[e.GetLanguages=7]="GetLanguages",e[e.SearchWordURL=8]="SearchWordURL",e[e.StorePageData=9]="StorePageData",e[e.DeletePageData=10]="DeletePageData",e[e.GetPageData=11]="GetPageData",e[e.GetCurrentActivation=12]="GetCurrentActivation",e[e.SetCurrentActivation=13]="SetCurrentActivation",e[e.ShowDeleteHighlightsCM=14]="ShowDeleteHighlightsCM",e[e.HideDeleteHighlightsCM=15]="HideDeleteHighlightsCM",e[e.GetAllDomains=16]="GetAllDomains",e[e.GetSeeSiteData=17]="GetSeeSiteData",e[e.GetAllExtensionData=18]="GetAllExtensionData",e[e.LoadExtensionData=19]="LoadExtensionData",e[e.GetLabelsForSite=20]="GetLabelsForSite",e[e.GetURLsForLabel=21]="GetURLsForLabel",e[e.AddLabelEntry=22]="AddLabelEntry",e[e.RemoveLabelEntry=23]="RemoveLabelEntry",e[e.GetAllLabels=24]="GetAllLabels"}(e||(e={}));const t=chrome.runtime.getURL("web_pages/popup.html");function n(e){document.getElementById(e).addEventListener("click",(()=>{chrome.tabs.create({url:`web_pages/${e}.html`})}))}var a,i;function o(e){const t=document.createElement("a"),n=new Blob([JSON.stringify(e,null,4)],{type:"application/json"}),a=window.URL.createObjectURL(n);t.setAttribute("href",a),t.setAttribute("download","vocabBuddyData.json"),t.click(),t.remove()}fetch(chrome.runtime.getURL("cross-page-assets/banner.html")).then((function(e){return n=this,a=void 0,o=function*(){const n=yield e.text();document.getElementById("banner_anchor").innerHTML+=n,window.location.href!==t&&(document.getElementById("banner_text").onclick=function(){const e=chrome.runtime.getURL("web_pages/index.html");window.location.href=e})},new((i=void 0)||(i=Promise))((function(e,t){function r(e){try{l(o.next(e))}catch(e){t(e)}}function c(e){try{l(o.throw(e))}catch(e){t(e)}}function l(t){var n;t.done?e(t.value):(n=t.value,n instanceof i?n:new i((function(e){e(n)}))).then(r,c)}l((o=o.apply(n,a||[])).next())}));var n,a,i,o})),n("new-dict"),n("edit-dict"),n("see-sites");const r=document.getElementById("import-data-path");r.addEventListener("change",(t=>{const n=t.target.files,a=new FileReader;a.addEventListener("load",(t=>{const n=JSON.parse(a.result),i={messageType:e.LoadExtensionData,payload:{data:n}};chrome.runtime.sendMessage(i),r.value=""})),null!==n&&a.readAsText(n[0])})),null===(a=document.getElementById("import-data"))||void 0===a||a.addEventListener("click",(()=>{var e;null===(e=document.getElementById("import-data-path"))||void 0===e||e.click()})),null===(i=document.getElementById("export-data"))||void 0===i||i.addEventListener("click",(()=>{const t={messageType:e.GetAllExtensionData,payload:null};chrome.runtime.sendMessage(t,o)}))})();

(() => {
    "use strict";
    var e;
    !(function (e) {
      (e[(e.DictsOfLang = 0)] = "DictsOfLang"),
        (e[(e.GetCurrentDictionary = 1)] = "GetCurrentDictionary"),
        (e[(e.SetCurrentDictionary = 2)] = "SetCurrentDictionary"),
        (e[(e.AddNewDictionary = 3)] = "AddNewDictionary"),
        (e[(e.GetExistingDictionary = 4)] = "GetExistingDictionary"),
        (e[(e.UpdateExistingDictionary = 5)] = "UpdateExistingDictionary"),
        (e[(e.DeleteExitingDictionary = 6)] = "DeleteExitingDictionary"),
        (e[(e.GetLanguages = 7)] = "GetLanguages"),
        (e[(e.SearchWordURL = 8)] = "SearchWordURL"),
        (e[(e.StorePageData = 9)] = "StorePageData"),
        (e[(e.DeletePageData = 10)] = "DeletePageData"),
        (e[(e.GetPageData = 11)] = "GetPageData"),
        (e[(e.GetCurrentActivation = 12)] = "GetCurrentActivation"),
        (e[(e.SetCurrentActivation = 13)] = "SetCurrentActivation"),
        (e[(e.ShowDeleteHighlightsCM = 14)] = "ShowDeleteHighlightsCM"),
        (e[(e.HideDeleteHighlightsCM = 15)] = "HideDeleteHighlightsCM"),
        (e[(e.GetAllDomains = 16)] = "GetAllDomains"),
        (e[(e.GetSeeSiteData = 17)] = "GetSeeSiteData"),
        (e[(e.GetAllExtensionData = 18)] = "GetAllExtensionData"),
        (e[(e.LoadExtensionData = 19)] = "LoadExtensionData"),
        (e[(e.GetLabelsForSite = 20)] = "GetLabelsForSite"),
        (e[(e.GetURLsForLabel = 21)] = "GetURLsForLabel"),
        (e[(e.AddLabelEntry = 22)] = "AddLabelEntry"),
        (e[(e.RemoveLabelEntry = 23)] = "RemoveLabelEntry"),
        (e[(e.GetAllLabels = 24)] = "GetAllLabels");
    })(e || (e = {}));
    const t = chrome.runtime.getURL("web_pages/popup.html");
    function n(e) {
      document.getElementById(e).addEventListener("click", () => {
        chrome.tabs.update({ url: `web_pages/${e}.html` });
      });
    }
    var a, i;
    function o(e) {
      const t = document.createElement("a"),
        n = new Blob([JSON.stringify(e, null, 4)], { type: "application/json" }),
        a = window.URL.createObjectURL(n);
      t.setAttribute("href", a),
        t.setAttribute("download", "vocabBuddyData.json"),
        t.click(),
        t.remove();
    }
    fetch(chrome.runtime.getURL("cross-page-assets/banner.html")).then(
      function (e) {
        return (
          (n = this),
          (a = void 0),
          (o = function* () {
            const n = yield e.text();
            (document.getElementById("banner_anchor").innerHTML += n),
              window.location.href !== t &&
                (document.getElementById("banner_text").onclick = function () {
                  const e = chrome.runtime.getURL("web_pages/index.html");
                  window.location.href = e;
                });
          }),
          new ((i = void 0) || (i = Promise))(function (e, t) {
            function r(e) {
              try {
                l(o.next(e));
              } catch (e) {
                t(e);
              }
            }
            function c(e) {
              try {
                l(o.throw(e));
              } catch (e) {
                t(e);
              }
            }
            function l(t) {
              var n;
              t.done
                ? e(t.value)
                : ((n = t.value),
                  n instanceof i
                    ? n
                    : new i(function (e) {
                        e(n);
                      })).then(r, c);
            }
            l((o = o.apply(n, a || [])).next());
          })
        );
        var n, a, i, o;
      },
    ),
      n("new-dict"),
      n("edit-dict"),
      n("see-sites");
    const r = document.getElementById("import-data-path");
    r.addEventListener("change", (t) => {
      const n = t.target.files,
        a = new FileReader();
      a.addEventListener("load", (t) => {
        const n = JSON.parse(a.result),
          i = { messageType: e.LoadExtensionData, payload: { data: n } };
        chrome.runtime.sendMessage(i), (r.value = "");
      }),
        null !== n && a.readAsText(n[0]);
    }),
      null === (a = document.getElementById("import-data")) ||
        void 0 === a ||
        a.addEventListener("click", () => {
          var e;
          null === (e = document.getElementById("import-data-path")) ||
            void 0 === e ||
            e.click();
        }),
      null === (i = document.getElementById("export-data")) ||
        void 0 === i ||
        i.addEventListener("click", () => {
          const t = { messageType: e.GetAllExtensionData, payload: null };
          chrome.runtime.sendMessage(t, o);
        });
  })();
  