import { IParamsObject, IParamsObjectStringified, IGoodsInfo, IEventTargetValue } from './interfaces';
import { showAllGoods, currentGoods, hideDetailedInfo, sortGoodsPriceUp, sortGoodsPriceDown,
         sortGoodsRatingUp, sortGoodsRatingDown, searchGoods, showGoods } from './show-goods';
import { goodsList } from './goods-list';
import { mainSearch } from './event-listeners';
import { openGoodsDescription } from './goods-description';
import { getGoodsResult, category, addCategoryGoods, changeShowGoodsBrand, changeShowGoodsCategory,
         brand, addBrandGoods, goodsResult, removeFiltersGoods, removeBrandGoods, createPriceSlider, createStockSlider } from './filter-category';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

let currentURL: URL = new URL (window.location.href);
let searchParams: URLSearchParams | string;
let paramsObject: IParamsObject = {
  //sort: "",
  //search: "",
  //layout: "",
  category: [],
  brand: [],
  //price: "",
  //stock: "",
};
let paramsObjectStringified: IParamsObjectStringified = JSON.parse(JSON.stringify(paramsObject));
let queryString: string;

// removing everything that goes after hash basically clearing URL string
function removeHash (): void { 
  history.pushState("", document.title, window.location.pathname + window.location.search);
}

// setting new URL parameters when opening a new page (e.g. Main, Details, Cart)
const setNewPageURL: (arg: string) => void = function(newURLParameters) {
  //let params = new URLSearchParams(window.location.search);
  window.history.pushState({}, '', `/#/${newURLParameters}`);
}


// parsing query string, putting the values into paramsObject, restoring the page state
const parseQueryString: () => void = function() {
  let queryString = window.location.search;

  let noQuestionMark: string | Array<string>;
  let splitByEqual: Array<Array<string>> | undefined = [];
  if (queryString.length > 1 && queryString[0] === "?"){
    noQuestionMark = queryString.slice(1);
    noQuestionMark = noQuestionMark.split("&");

    noQuestionMark.forEach((e) => {
      let temp: Array<string> = e.split("=");
      splitByEqual!.push(temp);
    });

    splitByEqual.forEach((e) => {
      switch (e[0]){
        case "sort":
          paramsObject.sort = e[1];
          let mainSort: HTMLSelectElement = document.getElementById("main_sort") as HTMLSelectElement;
          switch (e[1]){
            case "priceUp":
              mainSort.selectedIndex = 1;
              sortGoodsPriceUp(getGoodsResult());
              break;
            case "priceDown":

            if (goodsResult.length === 0){
              sortGoodsPriceDown(currentGoods);
            } else sortGoodsPriceDown(goodsResult);

              break;
            case "ratingUp":
              mainSort.selectedIndex = 3;
              
              if (goodsResult.length === 0){
                sortGoodsRatingUp(currentGoods);
              } else sortGoodsRatingUp(goodsResult);

              break;
            case "ratingDown":
              mainSort.selectedIndex = 4;

              if (goodsResult.length === 0){
                sortGoodsRatingDown(currentGoods);
              } else sortGoodsRatingDown(goodsResult);

              break;
          };
          break;

        case "search":
 
          paramsObject.search = e[1];
          mainSearch.value = e[1];

          if (goodsResult.length === 0){
            searchGoods(currentGoods, mainSearch.value);
          } else searchGoods(goodsResult, mainSearch.value);

          break;

        case "layout":
          if (e[1] === "large"){
            paramsObject.layout = e[1];
            setQueryParameters("layout", "large");
          }
          if (e[1] === "small"){
            paramsObject.layout = e[1];
            const goodsContentWrapper: HTMLElement = document.getElementById("content__products")!;
            goodsContentWrapper.classList.remove("large");
            goodsContentWrapper.classList.add("small");
            setQueryParameters("layout", "small");
            hideDetailedInfo();
          }
          break;
        
        case "category":
        
          const filtersCategoryItems = document.querySelector('.filters__category__items') as HTMLDivElement;
          const inputsCategory = filtersCategoryItems.querySelectorAll('input');
          let categoryArray = e[1].split("_");
          categoryArray.forEach(elem => {
            for (let i = 0; i < inputsCategory.length; i++) {
              if (elem === inputsCategory[i].name){
                inputsCategory[i].checked = true;
                category.push(inputsCategory[i].name);
                addCategoryGoods();
              }
            }
            setQueryParameters("category", elem);
          });
          
          changeShowGoodsCategory();
          showGoods(getGoodsResult());
          break;
        
        case "brand":
          const filtersBrandItems = document.querySelector('.filters__brand__items') as HTMLDivElement;
          const inputsBrand = filtersBrandItems.querySelectorAll('input');

          let brandArray = e[1].split("_");
          brandArray.forEach(elem => {
            for (let i = 0; i < inputsBrand.length; i++) {
              if (elem === inputsBrand[i].name){
                inputsBrand[i].checked = true;
                brand.push(inputsBrand[i].name);
                addBrandGoods();
              }
            }
            setQueryParameters("brand", elem);
          });
          
          changeShowGoodsBrand();
          showGoods(getGoodsResult());
          break;
/*
        case "price":

          console.log(queryString, "querystring");
          const sliderPrice = document.querySelector('.filters__price');
          const snapSlider = document.querySelector('.slider-snap-price') as noUiSlider.target;
          let priceArray = e[1].split("_");

          console.log("priceArray: ", priceArray);
          const snapValues = [
            sliderPrice?.querySelector('.slider-snap-value-lower') as HTMLElement,
            sliderPrice?.querySelector('.slider-snap-value-upper') as HTMLElement
          ];

          //if (snapSlider !== undefined)
          snapValues[0].textContent = priceArray[0];
          snapValues[1].textContent = priceArray[1];


          let url = new URL(window.location.href);
                    let params = new URLSearchParams(url.search);
                    params.set("price", `${priceArray[0]}_${priceArray[1]}`); 
                    window.history.pushState({}, '', `?${params.toString()}`);
                    paramsObject.price = `${priceArray[0]}_${priceArray[1]}`;
                    paramsObjectStringified.price = `${priceArray[0]}_${priceArray[1]}`;
          
          paramsObject.price = e[1];
          paramsObjectStringified.price = e[1];
          //setQueryParameters("price", e[1]);
          
          //searchGoods(getGoodsResult(), mainSearch.value);
          break;
      */
      }
    })
  }

  // парсинг страницы goods description
  let hash = window.location.hash;
  if (hash[2] === "p" && hash[4] === "o"){
    let productIdHash = Number(hash.split("/")[hash.split("/").length-1]);
    openGoodsDescription(productIdHash);
  }
};

// copying the URL into
const copyToClipboard: () => void = function(){
  navigator.clipboard.writeText(window.location.href);
  const copyButton: HTMLButtonElement = document.getElementById("filters__control__copy") as HTMLButtonElement;
  let interimText: string = copyButton.innerHTML;
  copyButton.innerHTML = "";
  copyButton.innerHTML = "Success";
  setTimeout(() => { copyButton.innerHTML = interimText}, 1000);
}

// функция setQueryParameters(key, value) кладёт пару key=value в адресную строку в качестве query-строки
const setQueryParameters = function(key: string, value: string): void{
  // кладём ключ key со значением value в объект paramsObject в зависимости от выбранной фильтрации, сортировки и т.д.
  switch (key) {
    case "sort":
      if (typeof value === "string"){
      paramsObject.sort = value;
      paramsObjectStringified = JSON.parse(JSON.stringify(paramsObject));
      };
      break;
    case "search":
      if (typeof value === "string"){
        paramsObject.search = value;
        paramsObjectStringified = JSON.parse(JSON.stringify(paramsObject));
      };
      break;
    case "layout":
      if (value === "large"|| value === "small"){
        paramsObject.layout = value;
        paramsObjectStringified = JSON.parse(JSON.stringify(paramsObject));
      };
      break;
    case "category":
      if (typeof value === "string"){
        paramsObject.category.push(value);
      };
      break;
    case "brand":
      if (typeof value === "string"){
        paramsObject.brand.push(value);
      };
      break;
    case "price":
      if (typeof value === "string"){
        paramsObject.price = value;
      };
      break;
    case "stock":
      if (typeof value === "string"){
        paramsObject.stock = value;
      };
      break;
  }

  // creating an object with stringified values

  if (paramsObject.search != undefined && paramsObject.search.length <= 0){
      delete paramsObjectStringified.search;
    };
  
  // НАСТЯ, эти if'ы внизу для твоей фильтрации, можешь переделывать по желанию.
  if (paramsObject.category instanceof Array ){
    if (paramsObject.category.length > 0){
      paramsObjectStringified.category = paramsObject.category.join("_");
    } else if (paramsObject.category.length <= 0){
      delete paramsObjectStringified.category;
    }
  };
  if (paramsObject.brand instanceof Array){
    if (paramsObject.brand.length > 0){
      paramsObjectStringified.brand = paramsObject.brand.join("_");
    } else if (paramsObject.brand.length <= 0){
      delete paramsObjectStringified.brand;
    }
  };
  if (paramsObject.price != undefined &&
     (Number(paramsObject.price?.split("_")[0]) === 10 && Number(paramsObject.price?.split("_")[1]) === 1749)){
    delete paramsObjectStringified.price;
  };
  if (paramsObject.stock != undefined &&
    (Number(paramsObject.stock?.split("_")[0]) === 2 && Number(paramsObject.stock?.split("_")[1]) === 150)){
   delete paramsObjectStringified.stock;
 };

  // assigning stringified object as a parameter of searchParams function and then stringifying it
  searchParams = new URLSearchParams(paramsObjectStringified);
  queryString = searchParams.toString();
  const queryParams = new URLSearchParams(window.location.search);
  for (let key in paramsObjectStringified){
    queryParams.set(key, paramsObjectStringified[key as keyof IParamsObjectStringified]!)
  };
  window.history.pushState({}, '', `?${queryString}`);
  currentURL = new URL (window.location.href);
} 


// функция removeQueryParameters(key, value) удаляет значение value из пары key=value из качестве query-строки,
// а в случае, если у данного key больше нет value, удаляет и value
const removeQueryParameters = function(key: string, value: string | number): void{
  let index;
  switch (key) {
    // НАСТЯ, действия ниже в части "switch" этой функции removeQueryParameters() сделаны для твоей фильтрации
    case "category":
      index = paramsObject.category.indexOf(value as string);
      if (index > -1){
        paramsObject.category.splice(index, 1);
      };
      if (paramsObject.category.length > 0){
        paramsObjectStringified.category = paramsObject.category.join("_");
      } else if (paramsObject.category.length <= 0){
        delete paramsObjectStringified.category;
      };
      break;

    case "brand":
      index = paramsObject.brand.indexOf(value as string);
      if (index > -1){
        paramsObject.brand.splice(index, 1);
      };
      if (paramsObject.brand.length > 0){
        paramsObjectStringified.brand = paramsObject.brand.join("_");
      } else if (paramsObject.brand.length <= 0){
        delete paramsObjectStringified.brand;
      };
      break;
/*
    case "price":
      delete paramsObjectStringified.price;
      setQueryParameters("price", "");
      break;
*/
  }
  
  // assigning stringified object as a parameter of searchParams function and then stringifying it
  searchParams = new URLSearchParams(paramsObjectStringified);
  queryString = searchParams.toString();
  //window.location.href = window.location.href + `#${queryString}`;

  const queryParams = new URLSearchParams(window.location.search);
  for (let key in paramsObjectStringified){
    queryParams.set(key, paramsObjectStringified[key as keyof IParamsObjectStringified]!)
  };
  window.history.pushState({}, '', `?${queryString}`);
  currentURL = new URL (window.location.href);
}

// просто удаляем все параметры сортировки, фильтрации и поиска
const clearAllFilters = function(): void{
  paramsObject.category = [];
  paramsObject.brand = [];
  delete paramsObject.price;
  delete paramsObject.stock;
  delete paramsObject.sort;
  
  let mainSort: HTMLSelectElement = document.getElementById("main_sort") as HTMLSelectElement;
  mainSort.selectedIndex = 0;

  mainSearch.value = "";
  delete paramsObject.search;
  setQueryParameters("search", "");

  const filtersCategoryItems = document.querySelector('.filters__category__items') as HTMLDivElement;
  const inputsCategory = filtersCategoryItems.querySelectorAll('input');
  for (let i = 0; i < inputsCategory.length; i++){
    inputsCategory[i].checked = false;
    category.pop();
    removeFiltersGoods(inputsCategory[i].name);
  }

  const filtersBrandItems = document.querySelector('.filters__brand__items') as HTMLDivElement;
  const inputsBrand = filtersBrandItems.querySelectorAll('input');

  for (let i = 0; i < inputsBrand.length; i++) {
    inputsBrand[i].checked = false;
    brand.pop();
    removeBrandGoods(inputsBrand[i].name);
  }

  changeShowGoodsCategory();
  changeShowGoodsBrand();

  const sliderStock = document.querySelector('.filters__stock');
  const snapSlider1 = sliderStock?.querySelector('.slider-snap-stock') as noUiSlider.target;
  snapSlider1.noUiSlider?.reset();

  const sliderPrice = document.querySelector('.filters__price');
  const snapSlider2 = document.querySelector('.slider-snap-price') as noUiSlider.target;
  snapSlider2.noUiSlider?.reset();
  
  setQueryParameters("", "");
  showAllGoods(goodsList);
}

export { currentURL, setQueryParameters,searchParams, paramsObject, clearAllFilters, removeQueryParameters, parseQueryString, 
         copyToClipboard, setNewPageURL, paramsObjectStringified, queryString, removeHash }