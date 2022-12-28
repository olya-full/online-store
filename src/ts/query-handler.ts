import { IParamsObject, IParamsObjectStringified, IGoodsInfo, IEventTargetValue } from './interfaces';
import { showAllGoods, currentGoods, hideDetailedInfo, sortGoodsPriceUp, sortGoodsPriceDown,
         sortGoodsRatingUp, sortGoodsRatingDown, searchGoods } from './show-goods';
import { goodsList } from './goods-list';
import { mainSearch } from './event-listeners';

let currentURL: URL = new URL (window.location.href);
let searchParams: URLSearchParams | string;
let paramsObject: IParamsObject = {
  //sort: "",
  //search: "",
  //layout: "",
  category: [],
  brand: [],
  price: [],
  stock: [],
};
let paramsObjectStringified: IParamsObjectStringified = JSON.parse(JSON.stringify(paramsObject));
let queryString: string;

// parsing query string, putting the values into paramsObject, restoring the page state
const parseQueryString: () => void = function(){
  queryString = window.location.search;
  console.log(queryString);

  let noQuestionMark: string | Array<string>;
  let splitByEqual: Array<Array<string>> | undefined = [];
  if (queryString.length > 1 && queryString[0] === "?"){
    noQuestionMark = queryString.slice(1);
    noQuestionMark = noQuestionMark.split("&");
    console.log(noQuestionMark);

    noQuestionMark.forEach((e) => {
      let temp: Array<string> = e.split("=");
      splitByEqual!.push(temp);
    });
    console.log(splitByEqual);

    splitByEqual.forEach((e) => {
      switch (e[0]){
        case "sort":
          paramsObject.sort = e[1];
          let mainSort: HTMLSelectElement = document.getElementById("main_sort") as HTMLSelectElement;
          // переделать в будущем часть ниже, т.к. я, скорее всего, буду вызывать
        // Настину функцию, которая будет включать поиск и сортировку 
        // КРОМЕ mainSort.selectedIndex = !!!!!!!!!!!!!
          switch (e[1]){
            case "priceUp":
              mainSort.selectedIndex = 1;
              sortGoodsPriceUp(currentGoods);
              break;
            case "priceDown":
              mainSort.selectedIndex = 2;
              sortGoodsPriceDown(currentGoods);
              break;
            case "ratingUp":
              mainSort.selectedIndex = 3;
              sortGoodsRatingUp(currentGoods);
              break;
            case "ratingDown":
              mainSort.selectedIndex = 4;
              sortGoodsRatingDown(currentGoods);
              break;
          };
          break;

        case "search":
          paramsObject.search = e[1];
          mainSearch.value = e[1];
          // переделать в будущем часть ниже
          searchGoods(currentGoods, mainSearch.value);
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
        // СЮДА ДОБАВИТЬ ОБРАБОТКУ ФИЛЬТРОВ НАСТИ
      }
    })
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
const setQueryParameters = function(key: string, value: string | number): void{
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
    // НАСТЯ, действия ниже в части "switch" этой функции setQueryParameters() сделаны для твоей фильтрации
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
    // НАСТЯ, возможно, надо изменить в случае, если price и stock будут записываться в объект
    case "price":
      if (typeof value === "number"){
        paramsObject.price.push(value);
      };
      break;
    case "stock":
      if (typeof value === "number"){
        paramsObject.stock.push(value);
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
      paramsObjectStringified.category = paramsObject.category.join("-");
    } else if (paramsObject.category.length <= 0){
      delete paramsObjectStringified.category;
    }
  };
  if (paramsObject.brand instanceof Array){
    if (paramsObject.brand.length > 0){
      paramsObjectStringified.brand = paramsObject.brand.join("-");
    } else if (paramsObject.brand.length <= 0){
      delete paramsObjectStringified.brand;
    }
  };
  if (paramsObject.price instanceof Array){
    if (paramsObject.price.length > 0) {
      paramsObjectStringified.price = paramsObject.price.join("-");
    } else if (paramsObject.price.length <= 0){
      delete paramsObjectStringified.price;
    }
  };
  if (paramsObject.stock instanceof Array ){
    if (paramsObject.stock.length > 0) {
      paramsObjectStringified.stock = paramsObject.stock.join("-");
    } else if (paramsObject.stock.length <= 0){
      delete paramsObjectStringified.stock;
    }
  };

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
        paramsObjectStringified.category = paramsObject.category.join("-");
        console.log(paramsObject);
      } else if (paramsObject.category.length <= 0){
        delete paramsObjectStringified.category;
        console.log(paramsObjectStringified);
      };
      break;
    case "brand":
      index = paramsObject.brand.indexOf(value as string);
      if (index > -1){
        paramsObject.brand.splice(index, 1);
      };
      if (paramsObject.brand.length > 0){
        paramsObjectStringified.brand = paramsObject.brand.join("-");
      } else if (paramsObject.brand.length <= 0){
        delete paramsObjectStringified.brand;
      };
      break;
    // НАСТЯ, возможно, надо изменить в случае, если price и stock будут записываться в объект
    case "price":
      index = paramsObject.price.indexOf(value as number);
      if (index > -1){
        paramsObject.price.splice(index, 1);
      };
      if (paramsObject.price.length > 0) {
        paramsObjectStringified.price = paramsObject.price.join("-");
      } else if (paramsObject.price.length <= 0){
        delete paramsObjectStringified.price;
      };
      break;
    case "stock":
      index = paramsObject.stock.indexOf(value as number);
      if (index > -1){
        paramsObject.stock.splice(index, 1);
      };
      if (paramsObject.stock.length > 0) {
        paramsObjectStringified.stock = paramsObject.stock.join("-");
      } else if (paramsObject.stock.length <= 0){
        delete paramsObjectStringified.stock;
      };
      break;
  }

  console.log("later", paramsObjectStringified);
  
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
  paramsObject.price = [];
  paramsObject.stock = [];

  mainSearch.value = "";
  delete paramsObject.search;

  // Настя, куда-нибудь сюда сброс твоих фильтров?


  showAllGoods(goodsList);
  setQueryParameters("", "");
}

export { currentURL, setQueryParameters,searchParams, paramsObject, clearAllFilters, removeQueryParameters, parseQueryString, 
         copyToClipboard }