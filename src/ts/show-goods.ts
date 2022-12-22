import { goodsList, IGoodsList } from './goods-list';
import { IShowGoods, IOneProduct, IGoodsInfo } from './interfaces';
import { setQueryParameters, currentURL } from './query-handler';
import { mainSearch } from './event-listeners';

// declaring global variable for the goods array which is changed by sorting and filtering 
let currentGoods: IGoodsList;


// initial function triggered by "DOMContentLoaded" event
const showAllGoods: IShowGoods = function(localGoods: IGoodsList){
  localGoods = goodsList;
  showGoods(localGoods);
  currentGoods = showGoods(localGoods);
  return currentGoods;
}

// sorting functions in the control panel, triggered by selecting an item from the drop-down list
const sortGoodsPriceUp: IShowGoods = function(localGoods: IGoodsList){
  currentGoods = localGoods.sort((a, b) => {return a.price - b.price})
  showGoods(currentGoods);
  searchGoods(currentGoods, mainSearch.value);
  setQueryParameters("sort", "priceUp");
  return currentGoods;
}

const sortGoodsPriceDown: IShowGoods = function(localGoods: IGoodsList){
  currentGoods = localGoods.sort((a, b) => {return b.price - a.price})
  showGoods(currentGoods);
  searchGoods(currentGoods, mainSearch.value);
  setQueryParameters("sort", "priceDown");
  return currentGoods;
}

const sortGoodsRatingUp: IShowGoods = function(localGoods: IGoodsList){
  currentGoods = localGoods.sort((a, b) => {return a.rating - b.rating})
  showGoods(currentGoods);
  searchGoods(currentGoods, mainSearch.value);
  setQueryParameters("sort", "ratingUp");
  return currentGoods;
}

const sortGoodsRatingDown: IShowGoods = function(localGoods: IGoodsList){
  currentGoods = localGoods.sort((a, b) => {return b.rating - a.rating})
  showGoods(currentGoods);
  searchGoods(currentGoods, mainSearch.value);
  setQueryParameters("sort", "ratingDown");
  return currentGoods;
}

// searching for goods in the control panel
const searchGoods = function(currentGoods: IGoodsList, searchKey: string){
  let searchResultGoods = (function(currentGoods: IGoodsList, searchKey: string){
    return currentGoods.filter((obj: IOneProduct) => { return Object.keys(obj).some(key => { 
      if (key === "title" || 
          key === "brand" || 
          key === "category" || 
          key === "discountPercentage" || 
          key === "price" ||
          key === "rating" ||
          key === "stock"){
        return obj[key as keyof IOneProduct].toString().toLowerCase().includes(searchKey.toLowerCase());
      }
    })});
  }(currentGoods, searchKey));  
  showGoods(searchResultGoods);
  setQueryParameters("search", `${searchKey}`);
  return searchResultGoods;
}

// changing display in the control panel
const changeLayout: () => void = function(){
  const goodsContentWrapper: HTMLElement = document.getElementById("content__products")!;
  const goodsInfo: IGoodsInfo = document.querySelectorAll<HTMLElement>(".content__products__product__info");
  if (goodsContentWrapper.classList.contains("large")){
    goodsContentWrapper.classList.remove("large");
    goodsContentWrapper.classList.add("small");
    setQueryParameters("layout", "small");
    goodsInfo.forEach(e => e.style.display = "none");
  } else if (goodsContentWrapper.classList.contains("small")){
    goodsContentWrapper.classList.remove("small");
    goodsContentWrapper.classList.add("large");
    setQueryParameters("layout", "large");
    goodsInfo.forEach(e => e.style.display = "block");
  }
}

//////////// ______________AUXILIARY FUNCTION______________ ////////////
const showGoods: IShowGoods = function(localGoods): IGoodsList {
  const contentProducts: HTMLElement | null = document.getElementById("content__products");
  if (contentProducts instanceof HTMLElement){
    contentProducts.innerHTML = "";
  };

  // для Оли: надо добавить проверки на layout=large/layout=small,
  // в зависимости от проверки и query параметра добавить ".content__products"
  // или класс big, или класс small
  
  // populate "Count"
  let countValue: HTMLElement | null = document.querySelector(".content__control__count__value");
  if (countValue instanceof HTMLElement){
    countValue.innerHTML = "";
    countValue.innerHTML = localGoods.length + "";
  }

  // show goods
  for (let i = 0; i < localGoods.length; i++){
    const productWrapper: HTMLElement = document.createElement("div");
    productWrapper.classList.add("content__products__product__wrapper");
    document.querySelector(".content__products")?.append(productWrapper);

    const productCard: HTMLElement = document.createElement("div");
    productCard.classList.add("content__products__product");
    productCard.id = localGoods[i].id + "";
    productCard.style.background = `url(${localGoods[i].thumbnail}) 0% / cover`;
    productWrapper.append(productCard);

    // product title
    const productTitle: HTMLElement = document.createElement("div");
    productTitle.classList.add("content__products__product__title");
    productTitle.innerHTML = "";
    productTitle.innerHTML = localGoods[i].title;

    // products info
    const productInfo: HTMLElement = document.createElement("div");
    productInfo.classList.add("content__products__product__info");
    
    const infoCategory: HTMLElement = document.createElement("div");
    infoCategory.classList.add("content__products__product__info__item");
    infoCategory.innerHTML = "";
    infoCategory.innerHTML = `Category: ${localGoods[i].category}`;

    const infoBrand: HTMLElement = document.createElement("div");
    infoBrand.classList.add("content__products__product__info__item");
    infoBrand.innerHTML = "";
    infoBrand.innerHTML = `Brand: ${localGoods[i].brand}`;
    
    const infoPrice: HTMLElement = document.createElement("div");
    infoPrice.classList.add("content__products__product__info__item");
    infoPrice.innerHTML = "";
    infoPrice.innerHTML = `Price: $${localGoods[i].price}`;

    const infoDiscount: HTMLElement = document.createElement("div");
    infoDiscount.classList.add("content__products__product__info__item");
    infoDiscount.innerHTML = "";
    infoDiscount.innerHTML = `Discount: ${localGoods[i].discountPercentage}%`;

    const infoRating: HTMLElement = document.createElement("div");
    infoRating.classList.add("content__products__product__info__item");
    infoRating.innerHTML = "";
    infoRating.innerHTML = `Rating: ${localGoods[i].rating}`;

    const infoStock: HTMLElement = document.createElement("div");
    infoStock.classList.add("content__products__product__info__item");
    infoStock.innerHTML = "";
    infoStock.innerHTML = `Stock: ${localGoods[i].stock}`;
    
    productInfo.append(infoCategory, infoBrand, infoPrice, infoDiscount, infoRating, infoStock);

    // cart and details buttons
    const cartDetailsWrapper: HTMLElement = document.createElement("div");
    cartDetailsWrapper.innerHTML = "";

    const productCart: HTMLElement = document.createElement("div");
    productCart.classList.add("content__products__product__cart");
    productCart.innerHTML = "";
    productCart.innerHTML = "ADD TO CART";

    const productDetails: HTMLElement = document.createElement("div");
    productDetails.classList.add("content__products__product__details");
    productDetails.innerHTML = "";
    productDetails.innerHTML = "DETAILS";

    productCard.append(productTitle, productInfo, cartDetailsWrapper);
    cartDetailsWrapper.append(productCart, productDetails);
  }
  return localGoods;
}



export { showGoods, IShowGoods, currentGoods, showAllGoods, sortGoodsPriceUp, sortGoodsPriceDown,
         sortGoodsRatingUp, sortGoodsRatingDown, searchGoods, changeLayout }