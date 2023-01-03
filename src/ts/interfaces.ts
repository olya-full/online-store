// for event-listeners.ts
interface IEventTargetValue extends EventTarget {
  value: string;
};

// for show-goods.ts
interface IShowGoods {
  (goodsList: IGoodsList): IGoodsList;
  currentGoods?: IGoodsList;
};

type IGoodsInfo = NodeListOf<HTMLElement>;

// for goods-list.ts
type IGoodsList = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}[];

type IOneProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

// for query-handlers.ts
interface IParamsObject {
  sort?: string,
  search?: string,
  layout?: string,

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
  layout?: string,
  category?: string,
  brand?: string,
  price?: string,
  stock?: string,
}


export { IEventTargetValue, IShowGoods, IGoodsList, IParamsObject, IParamsObjectStringified, IOneProduct,
         IGoodsInfo }