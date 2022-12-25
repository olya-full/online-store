import { currentGoods, showAllGoods, sortGoodsPriceUp, sortGoodsPriceDown,
         sortGoodsRatingUp, sortGoodsRatingDown, searchGoods, showGoods, changeLayout, hideDetailedInfo } from './show-goods';
import { IEventTargetValue } from './interfaces'
import { setQueryParameters, clearAllFilters, removeQueryParameters, parseQueryString, copyToClipboard } from './query-handler'


// commencing JS on the page
window.addEventListener("DOMContentLoaded", () => {
  showAllGoods(currentGoods);
  listenSortGoods();
  listenSearchGoods();
  listenLayoutCheckbox();
  listenResetButton();
  parseQueryString();
  listenCopyToClipboard();
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
      hideDetailedInfo();
      setQueryParameters("search", `${mainSearch.value}`);
    }
  })

}

// listener for layout changer
const listenLayoutCheckbox = function(): void {
  const layoutCheckbox: HTMLInputElement = document.getElementById("content__control__layout_checkbox") as HTMLInputElement;
  layoutCheckbox.addEventListener("click", () => {
    if (layoutCheckbox.checked == true){
      changeLayout();
    } else if (layoutCheckbox.checked == false){
      changeLayout();
    }
  })
}

// listener for "Reset All (filters)" button
const listenResetButton = function(): void {
  const resetButton: HTMLButtonElement = document.getElementById("filters__control__reset") as HTMLButtonElement;
  resetButton.addEventListener("click", () => {
    clearAllFilters();
  })
}

// listener for copying the URL
const listenCopyToClipboard = function() : void {
  const copyButton: HTMLButtonElement = document.getElementById("filters__control__copy") as HTMLButtonElement;
  copyButton.addEventListener("click", () => {
    copyToClipboard();
  })
}

export { mainSearch }