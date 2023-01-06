import { showAllGoods } from "./show-goods";
import { goodsList } from "./goods-list";

// functions for hiding/showing the Main page
const displayNoneMain: () => void = function() {
  const mainPage: HTMLElement = document.getElementById("main") as HTMLElement;
  mainPage.style.display = "none";
}

const displayBlocKMain: () => void = function() {
  const mainPage: HTMLElement = document.getElementById("main") as HTMLElement;
  mainPage.style.display = "flex";
  showAllGoods(goodsList);
}

// functions for hiding/showing the Details page
const displayNonekDetails: () => void = function() {
  const goodsDetailsPage: HTMLElement = document.getElementById("goods__details") as HTMLElement;
  goodsDetailsPage.style.display = "none";
}

const displayBlockDetails: () => void = function() {
  const goodsDetailsPage: HTMLElement = document.getElementById("goods__details") as HTMLElement;
  goodsDetailsPage.style.display = "flex";
}

export { displayNoneMain, displayBlockDetails, displayBlocKMain, displayNonekDetails }