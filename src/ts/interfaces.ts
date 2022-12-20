// for event-listeners.ts
interface IEventTargetValue extends EventTarget {
  value: string;
};

// for show-goods.ts
interface IShowGoods {
  (goodsList: IGoodsList): IGoodsList;
  currentGoods?: IGoodsList;
};

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

export { IEventTargetValue, IShowGoods, IGoodsList }