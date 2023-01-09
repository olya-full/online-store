import { goodsList, IGoodsList } from './goods-list';
import { IShowGoods, IOneProduct, IGoodsInfo } from './interfaces';
import { setQueryParameters, currentURL, paramsObjectStringified, queryString, paramsObject } from './query-handler';
import { mainSearch, listenGoodsDescription } from './event-listeners';
import { goodsResult, getGoodsResult, applySortingAfterCheck, goodsForCategory, goodsForBrand,
         goodsForPrice, goodsForStock} from './filter-category';
import { addGoodsToCart, getIdGoodDescr, cart } from './cart';

// declaring global variable for the goods array which is changed by sorting and filtering 
let currentGoods: IGoodsList = goodsList;


// initial function triggered by "DOMContentLoaded" event
const showAllGoods: IShowGoods = function(localGoods: IGoodsList){
  localGoods = goodsList;
  currentGoods = showGoods(localGoods);
  if (queryString && queryString.length > 0){
    searchGoods(getGoodsResult(), mainSearch.value);
  } else {
    showGoods(localGoods);  
  }
  return currentGoods;
}

// sorting functions in the control panel, triggered by selecting an item from the drop-down list
const sortGoodsPriceUp: IShowGoods = function(localGoods: IGoodsList){
  let innerGoods;
  if (getGoodsResult().length === 0) {
    if (goodsForCategory.length === 0 && goodsForBrand.length === 0 && goodsForPrice.length === 0 && goodsForStock.length === 0) {
      innerGoods = currentGoods.sort((a, b) => {return a.price - b.price});
    } else {
      innerGoods = localGoods.sort((a, b) => {return a.price - b.price});
    }; 
  } else innerGoods = localGoods.sort((a, b) => {return a.price - b.price}); 
  
  //currentGoods = innerGoods;
  showGoods(innerGoods);
  searchGoods(innerGoods, mainSearch.value);
  setQueryParameters("sort", "priceUp");
  hideDetailedInfo();
  return innerGoods;
}

const sortGoodsPriceDown: IShowGoods = function(localGoods: IGoodsList){
  let innerGoods;

  if (getGoodsResult().length === 0) {
    if (goodsForCategory.length === 0 && goodsForBrand.length === 0 && goodsForPrice.length === 0 && goodsForStock.length === 0) {
      innerGoods = currentGoods.sort((a, b) => {return b.price - a.price});
    } else {
      innerGoods = localGoods.sort((a, b) => {return b.price - a.price});
    }; 
  } else innerGoods = localGoods.sort((a, b) => {return b.price - a.price}); 

  //currentGoods = innerGoods;
  showGoods(innerGoods);
  searchGoods(innerGoods, mainSearch.value);
  setQueryParameters("sort", "priceDown");
  hideDetailedInfo();
  return innerGoods;
}

const sortGoodsRatingUp: IShowGoods = function(localGoods: IGoodsList){
  let innerGoods;

  if (getGoodsResult().length === 0) {
    if (goodsForCategory.length === 0 && goodsForBrand.length === 0 && goodsForPrice.length === 0 && goodsForStock.length === 0) {
      innerGoods = currentGoods.sort((a, b) => {return a.rating - b.rating});
    } else {
      innerGoods = localGoods.sort((a, b) => {return a.rating - b.rating});
    }; 
  } else innerGoods = localGoods.sort((a, b) => {return a.rating - b.rating}); 

  //currentGoods = innerGoods;
  showGoods(innerGoods);
  searchGoods(innerGoods, mainSearch.value);
  setQueryParameters("sort", "ratingUp");
  hideDetailedInfo();
  return innerGoods;
}

const sortGoodsRatingDown: IShowGoods = function(localGoods: IGoodsList){
  let innerGoods;

  if (getGoodsResult().length === 0) {
    if (goodsForCategory.length === 0 && goodsForBrand.length === 0 && goodsForPrice.length === 0 && goodsForStock.length === 0) {
      innerGoods = currentGoods.sort((a, b) => {return b.rating - a.rating});
    } else {
      innerGoods = localGoods.sort((a, b) => {return b.rating - a.rating});
    }; 
  } else innerGoods = localGoods.sort((a, b) => {return b.rating - a.rating}); 
  
  //currentGoods = innerGoods;
  showGoods(innerGoods);
  searchGoods(innerGoods, mainSearch.value);
  setQueryParameters("sort", "ratingDown");
  hideDetailedInfo();
  return innerGoods;
}

// searching for goods in the control panel
const searchGoods = function(localGoods: IGoodsList, searchKey: string){
  let searchResultGoods = (function(currentGoods: IGoodsList, searchKey: string){
    localGoods = currentGoods;
    return localGoods.filter((obj: IOneProduct) => { return Object.keys(obj).some(key => { 
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
  }(localGoods, searchKey));


  
  showGoods(searchResultGoods);

  setQueryParameters("search", `${searchKey}`);
  hideDetailedInfo();
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

// function removing detailed product info from the product card when the view is set to "small icons"
const hideDetailedInfo: () => void = function(){
  const goodsContentWrapper: HTMLElement = document.getElementById("content__products")!;
  if (goodsContentWrapper.classList.contains("small")){
    const goodsInfo: IGoodsInfo = document.querySelectorAll<HTMLElement>(".content__products__product__info");
    goodsInfo.forEach(e => e.style.display = "none");
    const layoutCheckbox: HTMLInputElement = document.getElementById("content__control__layout_checkbox") as HTMLInputElement;
    layoutCheckbox.checked = true;
  };
}

//////////// ______________AUXILIARY FUNCTION______________ ////////////
const showGoods: IShowGoods = function(localGoods): IGoodsList {
  // make sure the other areas like cart and product info are not displayed
  if (window.location.hash[1] !== "p"){
    const goodsDetails: HTMLElement = document.getElementById("goods__details") as HTMLElement;
    goodsDetails.style.display = "none";
  }
  
  let noGoodsText: HTMLElement = document.getElementById("noGoodsText") as HTMLElement;
  noGoodsText.style.display = "none";
  
  const contentProducts: HTMLElement | null = document.getElementById("content__products");
  if (contentProducts instanceof HTMLElement){
    contentProducts.innerHTML = "";
  };

  hideDetailedInfo();



  // populate "Count"
  let countValue: HTMLElement | null = document.querySelector(".content__control__count__value");
  if (countValue instanceof HTMLElement){
    countValue.innerHTML = "";
    countValue.innerHTML = localGoods.length + "";
  };
  if (localGoods.length <= 0){
    noGoodsText.style.display = "block";
  } else {
    noGoodsText.style.display = "none";
  };

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
    productTitle.innerHTML = localGoods[i].title.toUpperCase();

    // products info
    const productInfoWrapper: HTMLElement = document.createElement("div");

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

    // -------------------------- Настя добавила класс "add-to-cart" -------------------------------//
    
    productCart.classList.add("content__products__product__cart", "button_product", "button", "add-to-cart");
    productCart.innerHTML = "";

    // choosing text for "add to cart" button depending on whether the car has this product
    if (cart.some(e => e.id === Number(productCard.id))){
      productCart.innerHTML = "DROP FROM CART";
    } else {
      productCart.innerHTML = "ADD TO CART";
    }   

    const productDetails: HTMLElement = document.createElement("div");
    productDetails.classList.add("content__products__product__details", "button_product", "button");
    productDetails.innerHTML = "";
    productDetails.innerHTML = "DETAILS";

    productCard.append(productTitle, productInfoWrapper, cartDetailsWrapper);
    productInfoWrapper.append(productInfo);
    cartDetailsWrapper.append(productCart, productDetails);
  }
  listenGoodsDescription();
  
  // ------------------------Настя добавила вызов функции для добавления товаров в корзину -----------------------//
  addGoodsToCart();
  // getIdGoodDescr();
  return localGoods;
}



export { showGoods, IShowGoods, currentGoods, showAllGoods, sortGoodsPriceUp, sortGoodsPriceDown,
         sortGoodsRatingUp, sortGoodsRatingDown, searchGoods, changeLayout, hideDetailedInfo }