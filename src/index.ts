import BlackyEngine from "./library/BlackyEngine";

let gameManager: BlackyEngine;

window.onload = () => {
  gameManager = new BlackyEngine("game", 2);
  gameManager.start();
};
