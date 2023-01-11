// for cart.ts
type ISeveralArguments<T> = Array<T>;
type IShowDescreaseButton = (...args: ISeveralArguments<HTMLElement>) => void;

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
  category: Array<string>,
  brand: Array<string>,
  price?: string,
  stock?: string,
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


type ICartList = {
  id: number;
  count: number;
  price: number;
  totalPrice: number;
  stock: number;
}[]

type ICartGood = {
  id: number;
  count: number;
  price: number;
  totalPrice: number;
  stock: number;
}

type IPromoCode = {
  value: string;
  discount: number;
}[]



export { IEventTargetValue, IShowGoods, IGoodsList, IParamsObject, IParamsObjectStringified, IOneProduct,
         IGoodsInfo, ICartList, ICartGood, IPromoCode, IShowDescreaseButton }

