(() => {
    "use strict";
    var e, t;
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
    })(e || (e = {})),
      (function (e) {
        (e[(e.ActivationStateChange = 0)] = "ActivationStateChange"),
          (e[(e.DeleteChosenHighlight = 1)] = "DeleteChosenHighlight"),
          (e[(e.StartQuiz = 2)] = "StartQuiz"),
          (e[(e.ChangeHighlightStyle = 3)] = "ChangeHighlightStyle");
      })(t || (t = {}));
    const n = chrome.runtime.getURL("web_pages/popup.html");
    function a(e, t, n, a, i) {
      let l = document.getElementById(e);
      l.innerHTML = "";
      let o = null;
      for (let e = 0; e < t.length; e++) {
        let a = `${e}`,
          r = document.createElement("option");
        r.setAttribute("value", `${e}`);
        let c = document.createTextNode(n(t[e]));
        r.appendChild(c), l.appendChild(r), i(t[e]) && (o = a);
      }
      return null !== o && (l.value = o), l;
    }
    function i(t, n) {
      let i = { messageType: e.DictsOfLang, payload: { language: n } };
      chrome.runtime.sendMessage(i, (e) =>
        (function (e, t) {
          let n = a(
            "dictionaries",
            e,
            (e) => e.name,
            0,
            (e) => !1,
          );
          if (null !== n)
            if (null !== t) {
              let e = `${t.index}`;
              n.value = e;
            } else n.childNodes.length > 0 && (n.value = "0");
        })(e, t),
      );
    }
    function l(e) {
      document.getElementById(e).addEventListener("click", () => {
        chrome.tabs.create({ url: `web_pages/${e}.html` });
      });
    }
    const o = { language: "", index: -1 };
    fetch(chrome.runtime.getURL("cross-page-assets/banner.html")).then(
      function (e) {
        return (
          (t = this),
          (a = void 0),
          (l = function* () {
            const t = yield e.text();
            (document.getElementById("banner_anchor").innerHTML += t),
              window.location.href !== n &&
                (document.getElementById("banner_text").onclick = function () {
                  const e = chrome.runtime.getURL("web_pages/index.html");
                  window.location.href = e;
                });
          }),
          new ((i = void 0) || (i = Promise))(function (e, n) {
            function o(e) {
              try {
                c(l.next(e));
              } catch (e) {
                n(e);
              }
            }
            function r(e) {
              try {
                c(l.throw(e));
              } catch (e) {
                n(e);
              }
            }
            function c(t) {
              var n;
              t.done
                ? e(t.value)
                : ((n = t.value),
                  n instanceof i
                    ? n
                    : new i(function (e) {
                        e(n);
                      })).then(o, r);
            }
            c((l = l.apply(t, a || [])).next());
          })
        );
        var t, a, i, l;
      },
    ),
      (function () {
        l("new-dict"), l("index");
        const n = { messageType: e.GetCurrentActivation, payload: null };
        chrome.runtime.sendMessage(n, (n) => {
          const a = document.getElementById("activate");
          a.checked = n;
  
          const initialActivationState = a.checked;
          const elements = ["languages", "dictionaries", "new-dict", "index"];
          elements.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
              if (initialActivationState) {
                // If activation is ON
                element.classList.remove("disabled");
                element.style.pointerEvents = "auto";
                element.style.opacity = "1";
              } else {
                // If activation is OFF
                element.classList.add("disabled");
                element.style.pointerEvents = "none";
                element.style.opacity = "0.5"; // Optional, for visual indication
              }
            }
          });
          a.addEventListener("change", () => {
            let n = a.checked;
  
            const elements = ["languages", "dictionaries", "new-dict", "index"];
            elements.forEach((id) => {
              const element = document.getElementById(id);
              if (element) {
                if (n) {
                  element.classList.remove("disabled");
                  element.style.pointerEvents = "auto";
                  element.style.opacity = "1";
                } else {
                  element.classList.add("disabled");
                  element.style.pointerEvents = "none";
                  element.style.opacity = "0.5"; // Optional, to make them look visually disabled
                }
              }
            });
  
            const i = {
              messageType: e.SetCurrentActivation,
              payload: { isActivated: n },
            };
            chrome.runtime.sendMessage(i),
              chrome.tabs.query({}).then((e) => {
                for (let a = 0; a < e.length; a++) {
                  const i = e[a],
                    l = {
                      messageType: t.ActivationStateChange,
                      payload: { newActivatedState: n },
                    };
                  void 0 !== i.id && chrome.tabs.sendMessage(i.id, l);
                }
              });
          });
        });
      })();
    let r = { messageType: e.GetCurrentDictionary, payload: null };
    chrome.runtime.sendMessage(r, (t) => {
      (o.language = t.language), (o.index = t.index);
      let n = { messageType: e.GetLanguages, payload: null };
      chrome.runtime.sendMessage(n, (t) =>
        (function (t, n) {
          var l, o, r;
          (r = t),
            a(
              "languages",
              n,
              (e) => e,
              0,
              (e) => null !== r && e === r.language,
            ),
            (function (e, t) {
              var n, a;
              if (e.length > 0) {
                let n =
                  -1 === (a = t).index && 0 === a.language.length
                    ? e[0]
                    : t.language;
                i(t, n);
              }
              null === (n = document.getElementById("languages")) ||
                void 0 === n ||
                n.addEventListener("change", function () {
                  const n = e[parseInt(this.value)];
                  i(t, n);
                });
            })(n, t),
            null === (l = document.getElementById("dictionaries")) ||
              void 0 === l ||
              l.addEventListener("click", function () {
                const a = document.getElementById("languages");
                const i = n[parseInt(a.value)],
                  l = parseInt(this.value);
                let o = {
                  messageType: e.SetCurrentDictionary,
                  payload: { index: l, language: i },
                };
                chrome.runtime.sendMessage(o), (t.language = i), (t.index = l);
              }),
            null === (o = document.getElementById("dictionaries")) ||
              void 0 === o ||
              o.addEventListener("change", function () {
                const a = document.getElementById("languages"),
                  i = n[parseInt(a.value)],
                  l = parseInt(this.value);
                let o = {
                  messageType: e.SetCurrentDictionary,
                  payload: { index: l, language: i },
                };
                chrome.runtime.sendMessage(o), (t.language = i), (t.index = l);
              });
        })(o, t),
      );
    });
  })();
  