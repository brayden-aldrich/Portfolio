(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/static/js/main.js
  var require_main = __commonJS({
    "src/static/js/main.js"() {
      function getChildElementByClass(parentElement, className) {
        for (let child of parentElement.children) {
          if (child.classList.contains(className)) {
            return child;
          }
        }
        return null;
      }
      document.getElementById("companies-selection").addEventListener("change", (e) => {
        let cards = document.getElementsByClassName("project-card");
        for (let i = 0; i < cards.length; i++) {
          cards[i].classList.remove("hidden");
        }
        if (e.currentTarget.value === "") {
          return;
        }
        for (let i = 0; i < cards.length; i++) {
          if (cards[i].id !== e.currentTarget.value) {
            cards[i].classList.add("hidden");
          }
        }
      });
      var expandButtons = Array.from(document.getElementsByClassName("material-symbols-outlined"));
      expandButtons.forEach((i) => {
        i.addEventListener("click", (e) => {
          let card = e.currentTarget.parentElement.parentElement;
          if (card.classList.contains("expand")) {
            card.classList.remove("expand");
            e.currentTarget.innerText = "expand_content";
            let img = getChildElementByClass(card, "project-image");
            let vid = getChildElementByClass(card, "video-player");
            if (img) img.classList.remove("hidden");
            if (vid) vid.classList.add("hidden");
          } else {
            let img = getChildElementByClass(card, "project-image");
            let vid = getChildElementByClass(card, "video-player");
            if (img) img.classList.add("hidden");
            if (vid) {
              vid.classList.remove("hidden");
            } else {
              img.classList.remove("hidden");
            }
            card.classList.add("expand");
            e.currentTarget.innerText = "collapse_content";
          }
        });
      });
    }
  });
  require_main();
})();
//# sourceMappingURL=main.js.map
