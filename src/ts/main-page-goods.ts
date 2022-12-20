import { goodsList, IGoodsList } from "./goods-list";
import { showGoods, IShowGoods, currentGoods } from "./show-goods";


const showAllGoods: IShowGoods = function(): IGoodsList{
  let currentGoods: IGoodsList = goodsList;
  showGoods(currentGoods);
  currentGoods = showGoods(currentGoods);
  return currentGoods;
}

window.addEventListener("DOMContentLoaded", () => {
    showAllGoods(currentGoods);
})