
interface IParamsObject {
  sort?: string,
  search?: string,
  big?: string,

  // НАСТЯ, значения этого интерфейса объекта ниже - для тебя. я предположила, 
  //что ты будешь всё хранить в массивах, но это при необходимости можно изменить на, допустим, объект для
  // значений ключей price и stock, т.к. их может быть удобно хранить как пары min-max.в таком случае надо 
  //будет изменить конструкцию switch в функции setQueryParameters()
  category: Array<string>,
  brand: Array<string>,
  /* в объекте значения price и stock хранятся как массив цифр, но надо иметь в виду, что
  в query-строке все значения будут string. то есть перед тем, как класть значения в объект, 
  который мы будем класть в query-строку, значения key и value в объекте должны быть строко string и 
  заключены в кавычки, например 
    paramsObjectStringified = {
      foremerNumber: "5",
      formerBoolean: "true",
      formerArray: "smartphones-laptops-fragrances", 
  }
  для преобразования массива или объекта в строку нужно будет сделать дополнительный метод
  */
  price: Array<number>,
  stock: Array<number>,
}

type IParamsObjectStringified = {
  sort?: string,
  search?: string,
  big?: string,
  category?: string,
  brand?: string,
  price?: string,
  stock?: string,
}

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
    case "big":
      if (typeof value === "string"){
        paramsObject.big = value;
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