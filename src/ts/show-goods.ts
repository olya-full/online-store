import { goodsList, IGoodsList } from './goods-list';
import { IShowGoods } from './interfaces';
import { setQueryParameters, currentURL } from './query-handler';

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
  setQueryParameters("sort", "priceUp");
  console.log("currentURL:  " + currentURL);
  return currentGoods;
}

const sortGoodsPriceDown: IShowGoods = function(localGoods: IGoodsList){
  currentGoods = localGoods.sort((a, b) => {return b.price - a.price})
  showGoods(currentGoods);
  setQueryParameters("sort", "priceDown");
  return currentGoods;
}

const sortGoodsRatingUp: IShowGoods = function(localGoods: IGoodsList){
  currentGoods = localGoods.sort((a, b) => {return a.rating - b.rating})
  showGoods(currentGoods);
  setQueryParameters("sort", "ratingUp");
  return currentGoods;
}

const sortGoodsRatingDown: IShowGoods = function(localGoods: IGoodsList){
  currentGoods = localGoods.sort((a, b) => {return b.rating - a.rating})
  showGoods(currentGoods);
  setQueryParameters("sort", "ratingDown");
  return currentGoods;
}


//////////// ______________AUXILIARY FUNCTION______________ ////////////
const showGoods: IShowGoods = function(localGoods): IGoodsList {
  const contentProducts: HTMLElement | null = document.getElementById("content__products");
  if (contentProducts instanceof HTMLElement){
    contentProducts.innerHTML = "";
  };

  // для Оли: надо добавить проверки на big=false/big-true,
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
    const productCart: HTMLElement = document.createElement("div");
    productCart.classList.add("content__products__product__cart");
    productCart.innerHTML = "";
    productCart.innerHTML = "ADD TO CART";

    const productDetails: HTMLElement = document.createElement("div");
    productDetails.classList.add("content__products__product__details");
    productDetails.innerHTML = "";
    productDetails.innerHTML = "DETAILS";

    productCard.append(productTitle, productInfo, productCart, productDetails);
  }
  return localGoods;
}



export { showGoods, IShowGoods, currentGoods, showAllGoods, sortGoodsPriceUp, sortGoodsPriceDown,
         sortGoodsRatingUp, sortGoodsRatingDown }