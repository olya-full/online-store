import { goodsList, IGoodsList } from "./goods-list";
import { showGoods, IShowGoods, currentGoods } from "./show-goods";


const showAllGoods: IShowGoods = function(): void{
  let currentGoods: IGoodsList = goodsList;
  showGoods(currentGoods);
}

window.addEventListener("DOMContentLoaded", () => {
    showAllGoods(currentGoods);
})