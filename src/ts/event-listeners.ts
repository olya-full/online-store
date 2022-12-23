import { currentGoods, showAllGoods, sortGoodsPriceUp, sortGoodsPriceDown,
         sortGoodsRatingUp, sortGoodsRatingDown, searchGoods, showGoods, changeLayout } from './show-goods';
import { IEventTargetValue } from './interfaces'
import { setQueryParameters } from './query-handler'


// commencing JS on the page
window.addEventListener("DOMContentLoaded", () => {
  showAllGoods(currentGoods);
  listenSortGoods();
  listenSearchGoods();
  listenLayoutCheckbox();
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

// listener for goods search
const mainSearch: HTMLInputElement = <HTMLInputElement>document.getElementById("search");
const listenSearchGoods = function(): void {
  mainSearch.addEventListener("keyup", () => {
    if (mainSearch.value.length > 0){
      searchGoods(currentGoods, mainSearch.value);

    } else if (mainSearch.value.length <= 0){
      showGoods(currentGoods);
      setQueryParameters("search", `${mainSearch.value}`);
    }
  })

}

// listener for layout changer
const listenLayoutCheckbox = function (): void {
  const layoutCheckbox: HTMLInputElement = document.getElementById("content__control__layout_checkbox") as HTMLInputElement;
  layoutCheckbox.addEventListener("click", () => {
    if (layoutCheckbox.checked == true){
      changeLayout();
    } else if (layoutCheckbox.checked == false){
      changeLayout();
    }
  })
}

export { mainSearch }