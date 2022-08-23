import BlackyEngine from "./library/BlackyEngine";

let gameManager: BlackyEngine;

(() => {
  gameManager = new BlackyEngine("game", 60);
  gameManager.start();
})();
