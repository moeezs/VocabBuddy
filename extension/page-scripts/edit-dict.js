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

  const t = chrome.runtime.getURL("web_pages/popup.html");
  function n(e, t, n, a, i) {
    let l = document.getElementById(e);
    l.innerHTML = "";
    let o = null;
    for (let e = 0; e < t.length; e++) {
      let a = `${e}`,
        s = document.createElement("option");
      s.setAttribute("value", `${e}`);
      let d = document.createTextNode(n(t[e]));
      s.appendChild(d), l.appendChild(s), i(t[e]) && (o = a);
    }
    return null !== o && (l.value = o), l;
  }
  function a(t, a) {
    let i = { messageType: e.DictsOfLang, payload: { language: a } };
    chrome.runtime.sendMessage(i, (e) =>
      (function (e, t) {
        let a = n(
          "dictionaries",
          e,
          (e) => e.name,
          0,
          (e) => !1,
        );
        if (null !== a)
          if (null !== t) {
            let e = `${t.index}`;
            a.value = e;
          } else a.childNodes.length > 0 && (a.value = "0");
      })(e, t),
    );
  }
  function i(e, t) {
    document.getElementById(e).value = t;
  }
  function l() {
    (document.getElementById("choose_dictionary").style.display = "none"),
      (document.getElementById("show-status").style.display = "none"),
      (document.getElementById("mod_dict_items").style.display = "inline");
  }
  function o() {
    const t = { language: "", index: -1 };
    let i = { messageType: e.GetCurrentDictionary, payload: null };
    chrome.runtime.sendMessage(i, (i) => {
      (t.language = i.language), (t.index = i.index);
      let l = { messageType: e.GetLanguages, payload: null };
      chrome.runtime.sendMessage(l, (e) => {
        var i;
        (i = t),
          n(
            "languages",
            e,
            (e) => e,
            0,
            (e) => null !== i && e === i.language,
          ),
          (function (e, t) {
            var n, i;
            if (e.length > 0) {
              let n =
                -1 === (i = t).index && 0 === i.language.length
                  ? e[0]
                  : t.language;
              a(t, n);
            }
            null === (n = document.getElementById("languages")) ||
              void 0 === n ||
              n.addEventListener("change", function () {
                const n = e[parseInt(this.value)];
                a(t, n);
              });
          })(e, t);
      });
    });
  }
  function s() {
    const e = document.getElementById("languages"),
      t = document.getElementById("dictionaries").selectedIndex;
    return -1 === e.selectedIndex || -1 === t
      ? null
      : { language: e.options[e.selectedIndex].text, index: t };
  }
  fetch(chrome.runtime.getURL("cross-page-assets/banner.html")).then(
    function (e) {
      return (
        (n = this),
        (a = void 0),
        (l = function* () {
          const n = yield e.text();
          (document.getElementById("banner_anchor").innerHTML += n),
            window.location.href !== t &&
              (document.getElementById("banner_text").onclick = function () {
                const e = chrome.runtime.getURL("web_pages/index.html");
                window.location.href = e;
              });
        }),
        new ((i = void 0) || (i = Promise))(function (e, t) {
          function o(e) {
            try {
              d(l.next(e));
            } catch (e) {
              t(e);
            }
          }
          function s(e) {
            try {
              d(l.throw(e));
            } catch (e) {
              t(e);
            }
          }
          function d(t) {
            var n;
            t.done
              ? e(t.value)
              : ((n = t.value),
                n instanceof i
                  ? n
                  : new i(function (e) {
                      e(n);
                    })).then(o, s);
          }
          d((l = l.apply(n, a || [])).next());
        })
      );
      var n, a, i, l;
    },
  ),
    o(),
    document.getElementById("delete-dict").addEventListener("click", () => {
      const t = s(),
        n = (function () {
          const e = document.getElementById("dictionaries"),
            t = e.selectedIndex;
          return e.options[t].text;
        })();
      if (null !== t) {
        const a = { messageType: e.DeleteExitingDictionary, payload: t };
        chrome.runtime.sendMessage(a, (e) => {
          if (e) {
            o();
            const e = document.getElementById("show-status");
            (e.textContent = `${n} Deleted`), (e.style.display = "inherit");

            location.reload();
          }
        });
      }
    }),
    document.getElementById("edit_dict").addEventListener("click", () => {
      const t = s();
      if (null !== t) {
        const n = { messageType: e.GetExistingDictionary, payload: t };
        chrome.runtime.sendMessage(n, (e) => {
          if (e.name !== "") {
            i("lang", t.language);
            i("name", e.name);
            l();
          }
        });
      }
    }),
    document.getElementById("save_dict").addEventListener("click", () => {
      const t = s();
      if (null === t) return;
      
      const selectedLang = document.getElementById("lang").value;
      const n = {
          name: document.getElementById("name").value,
          url: r[selectedLang]
      };

      const a = {
          messageType: e.UpdateExistingDictionary,
          payload: {
              language: selectedLang,
              index: t,
              content: n
          }
      };

      chrome.runtime.sendMessage(a, (e) => {
          o();
          l();
          let t = document.getElementById("show-status");
          t.textContent = `${n.name} Modified`;
          t.style.display = "inherit";
      });
    });
})();