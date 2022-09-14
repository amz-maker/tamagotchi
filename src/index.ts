import BlackyEngine from "./library/BlackyEngine";
import { Util } from "./library/BlackyEngine/common/util";

let gameManager: BlackyEngine;

window.onload = () => {
  gameManager = new BlackyEngine("game", 2);
  gameManager.start();

  let arr = [{ num: 3 }, { num: 1 }, { num: 7 }, { num: 3 }, { num: 4 }];
  let res = Util.Sort.quick(arr, (element) => element.num);
  console.log(res);
};
