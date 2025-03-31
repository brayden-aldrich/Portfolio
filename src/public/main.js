(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/static/js/main.js
  var require_main = __commonJS({
    "src/static/js/main.js"() {
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
    }
  });
  require_main();
})();
//# sourceMappingURL=main.js.map
