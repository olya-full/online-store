import {IParamsObject, IParamsObjectStringified} from './interfaces'

let currentURL: URL;
let searchParams: URLSearchParams;
let paramsObject: IParamsObject = {
  category: [],
  brand: [],
  price: [],
  stock: [],
};
let paramsObjectStringified: IParamsObjectStringified;
let queryString: string;

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

export { currentURL, setQueryParameters,searchParams, paramsObject }