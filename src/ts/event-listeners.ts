import { currentGoods, showAllGoods, sortGoodsPriceUp, sortGoodsPriceDown,
         sortGoodsRatingUp, sortGoodsRatingDown, searchGoods, showGoods, changeLayout, hideDetailedInfo } from './show-goods';
import { IEventTargetValue } from './interfaces'
import { setQueryParameters, clearAllFilters, removeQueryParameters, parseQueryString, copyToClipboard, 
         paramsObject, removeHash, setNewPageURL } from './query-handler'
import { openGoodsDescription } from './goods-description';
import { goodsResult, getGoodsResult, createPriceSlider, createStockSlider } from './filter-category';
import { displayNoneMain, displayBlockDetails, displayBlocKMain, displayNonekDetails } from './hide-display-sections';


// commencing JS on the page
window.addEventListener("DOMContentLoaded", () => {
  parseQueryString();
  //showAllGoods(currentGoods);
  listenSortGoods();
  listenSearchGoods();
  listenLayoutCheckbox();
  listenResetButton();
  listenCopyToClipboard();
  createPriceSlider();
  createStockSlider();
  listenLogo();

});

// listener for goods sorting
const listenSortGoods = function(): void {
  const mainSort: HTMLElement = document.getElementById("main_sort") as HTMLElement;
  mainSort.addEventListener("click", (e: Event) => {
    const target: IEventTargetValue = e.target as IEventTargetValue;
    if (target.value !== mainSort.innerHTML){
      switch (target.value) {
        case "PriceUp":
          sortGoodsPriceUp(getGoodsResult());
          break;
        case "PriceDown":
          sortGoodsPriceDown(getGoodsResult());
          break;
        case "RatingUp":
          sortGoodsRatingUp(getGoodsResult());
          break;
        case "RatingDown":
          sortGoodsRatingDown(getGoodsResult());
          break;
        };
      }
  });
};

// listener for goods search
const mainSearch: HTMLInputElement = <HTMLInputElement>document.getElementById("search");
const listenSearchGoods = function(): void {
  mainSearch.addEventListener("keyup", () => {
    if (mainSearch.value.length > 0){
      searchGoods(goodsResult, mainSearch.value);

    } else if (mainSearch.value.length <= 0){
      showGoods(goodsResult);
      hideDetailedInfo();
      setQueryParameters("search", `${mainSearch.value}`);

      if (paramsObject.sort === undefined) {
        // showGoods(goodsForCategory);
        showGoods(getGoodsResult());
    } else {
        if (paramsObject.sort === 'priceUp') {
            sortGoodsPriceUp(getGoodsResult());
        } else if (paramsObject.sort === 'priceDown') {
            sortGoodsPriceDown(getGoodsResult());
        } else if (paramsObject.sort === 'ratingUp') {
            sortGoodsRatingUp(getGoodsResult());
        } else if (paramsObject.sort === 'ratingDown') {
            sortGoodsRatingDown(getGoodsResult());
        }
    }
    
    }
  })

}

// listener for layout changer
const listenLayoutCheckbox = function(): void {
  const layoutCheckbox: HTMLInputElement = document.getElementById("content__control__layout_checkbox") as HTMLInputElement;
  layoutCheckbox.addEventListener("click", () => changeLayout());
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

// listener for opening a product description page
const listenGoodsDescription: () => void = function(){
  const allGoodsCards = document.querySelectorAll(".content__products__product");
  let productID: number;
  
  allGoodsCards.forEach(elem => {
    elem.addEventListener("click", (event) => {
      let currentTarget = event.currentTarget as HTMLElement;
      let target = event.target as HTMLElement;
      productID = Number(currentTarget.id);
      if (target.classList.contains("content__products__product__cart")){
        let targetSuperParent = target.parentElement;
        targetSuperParent = targetSuperParent!.parentElement;        
        targetSuperParent = targetSuperParent!.parentElement;
        if (target.innerHTML === "ADD TO CART"){
          console.log("ADDED PRODUCT TO THE CART");
          targetSuperParent?.classList.add("added");
          target.innerHTML = "";
          target.innerHTML = "DROP FROM CART";
        } else if (target.innerHTML === "DROP FROM CART"){
          console.log("REMOVED PRODUCT FROM THE CART");
          targetSuperParent?.classList.remove("added");
          target.innerHTML = "";
          target.innerHTML = "ADD TO CART";
        }
      } else {
        openGoodsDescription(productID);
      }
    });
  });
}
// listener for the logo clicks
const listenLogo: () => void = function() {
  const logo: HTMLElement = document.querySelector(".logo") as HTMLElement;
  logo.addEventListener("click", () => {
    removeHash();
    displayBlocKMain();
    displayNonekDetails();
    clearAllFilters();
  })
}


export { mainSearch, listenGoodsDescription }