import { IParamsObject, IParamsObjectStringified } from './interfaces';
import { showAllGoods, currentGoods } from './show-goods';
import { goodsList } from './goods-list';
import { mainSearch } from './event-listeners';

let currentURL: URL = new URL (window.location.href);
let searchParams: URLSearchParams;
let paramsObject: IParamsObject = {
  category: [],
  brand: [],
  price: [],
  stock: [],
};
let paramsObjectStringified: IParamsObjectStringified;
let queryString: string;

// функция setQueryParameters(key, value) кладёт пару key=value в адресную строку в качестве query-строки
const setQueryParameters = function(key: string, value: string | number): void{
  // кладём ключ key со значением value в объект paramsObject в зависимости от выбранной фильтрации, сортировки и т.д.
  switch (key) {
    case "sort":
      if (typeof value === "string"){
      paramsObject.sort = value;
      };
      break;
    case "search":
      if (typeof value === "string"){
        paramsObject.search = value;
      };
      break;
    case "layout":
      if (typeof value === "string"){
        paramsObject.layout = value;
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
  paramsObjectStringified = JSON.parse(JSON.stringify(paramsObject));

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

  paramsObjectStringified = JSON.parse(JSON.stringify(paramsObject));
  
  // НАСТЯ, эти if'ы внизу для твоей фильтрации, можешь переделывать по желанию.


  


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
const clearQueryParameters = function(): void{
  delete paramsObject.sort;
  delete paramsObject.search;
  delete paramsObject.layout;
  paramsObject.category = [];
  paramsObject.brand = [];
  paramsObject.price = [];
  paramsObject.stock = [];
  mainSearch.value = "";
  const mainSort: HTMLInputElement = document.getElementById("main_sort") as HTMLInputElement;
  mainSort.value = "Sort";
  showAllGoods(goodsList);
  setQueryParameters("", "");
}

export { currentURL, setQueryParameters,searchParams, paramsObject, clearQueryParameters, removeQueryParameters }