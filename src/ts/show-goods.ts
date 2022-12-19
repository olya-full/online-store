// import { currentGoods } from "../index";
import { IGoodsList } from "./goods-list"

// interfaces
interface IShowGoods {
  (goodsList: IGoodsList): void;
};


// code
let currentGoods: IGoodsList;

const showGoods: IShowGoods = function(currentGoods): void {
  
  for (let i = 0; i < currentGoods.length; i++){
    const productWrapper: HTMLElement = document.createElement("div");
    productWrapper.classList.add("content__products__product__wrapper");
    document.querySelector(".content__products")?.append(productWrapper);

    const productCard: HTMLElement = document.createElement("div");
    productCard.classList.add("content__products__product");
    productCard.id = currentGoods[i].id + "";
    productCard.style.background = `url(${currentGoods[i].thumbnail}) 0% / cover`;
    productWrapper.append(productCard);

    // product title
    const productTitle: HTMLElement = document.createElement("div");
    productTitle.classList.add("content__products__product__title");
    productTitle.innerHTML = "";
    productTitle.innerHTML = currentGoods[i].title;

    // products info
    const productInfo: HTMLElement = document.createElement("div");
    productInfo.classList.add("content__products__product__info");
    
    const infoCategory: HTMLElement = document.createElement("div");
    infoCategory.classList.add("content__products__product__info__item");
    infoCategory.innerHTML = "";
    infoCategory.innerHTML = `Category: ${currentGoods[i].category}`;

    const infoBrand: HTMLElement = document.createElement("div");
    infoBrand.classList.add("content__products__product__info__item");
    infoBrand.innerHTML = "";
    infoBrand.innerHTML = `Brand: ${currentGoods[i].brand}`;
    
    const infoPrice: HTMLElement = document.createElement("div");
    infoPrice.classList.add("content__products__product__info__item");
    infoPrice.innerHTML = "";
    infoPrice.innerHTML = `Price: $${currentGoods[i].price}`;

    const infoDiscount: HTMLElement = document.createElement("div");
    infoDiscount.classList.add("content__products__product__info__item");
    infoDiscount.innerHTML = "";
    infoDiscount.innerHTML = `Discount: ${currentGoods[i].discountPercentage}%`;

    const infoRating: HTMLElement = document.createElement("div");
    infoRating.classList.add("content__products__product__info__item");
    infoRating.innerHTML = "";
    infoRating.innerHTML = `Rating: ${currentGoods[i].rating}`;

    const infoStock: HTMLElement = document.createElement("div");
    infoStock.classList.add("content__products__product__info__item");
    infoStock.innerHTML = "";
    infoStock.innerHTML = `Stock: ${currentGoods[i].stock}`;
    
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
}



export { showGoods, IShowGoods, currentGoods }