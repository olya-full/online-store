import { currentGoods, showAllGoods, sortGoodsPriceUp, sortGoodsPriceDown,
  sortGoodsRatingUp, sortGoodsRatingDown } from './show-goods';
import { IEventTargetValue } from './interfaces'


// commencing JS on the page
window.addEventListener("DOMContentLoaded", () => {
  showAllGoods(currentGoods);
  listenSortGoods();
});

// listener for goods sorting
const listenSortGoods = function(): void {
  const mainSort: HTMLElement = document.getElementById("main_sort") as HTMLElement;
  mainSort.addEventListener("click", (e: Event) => {
    const target: IEventTargetValue = e.target as IEventTargetValue;
    switch (target.value) {
      case "PriceUp":
        sortGoodsPriceUp(currentGoods);
        break;
      case "PriceDown":
        sortGoodsPriceDown(currentGoods);
        break;
      case "RatingUp":
        sortGoodsRatingUp(currentGoods);
        break;
      case "RatingDown":
        sortGoodsRatingDown(currentGoods);
        break;
    };
  });
};
