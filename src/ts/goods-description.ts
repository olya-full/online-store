import { IGoodsList, IOneProduct } from "./interfaces";
import { goodsList } from "./goods-list";
import { displayBlockDetails, displayNoneMain, displayNoneDetails, displayBlocKMain } from "./hide-display-sections";
import { addGoodsToCart } from './cart';
import { setQueryParameters, setNewPageURL, removeHash, paramsObject } from "./query-handler";


const openGoodsDescription = function(productID: number) {
  if (productID >= 0 && productID <= 100){
    displayNoneMain();
    displayBlockDetails();
    removeHash();

    const product = goodsList.find((obj: IOneProduct) => obj.id === productID);
    setNewPageURL(`product/${productID}`);
    const breadCrumb0: HTMLElement = document.getElementById("goods__details__breadcrumb0")!;
    const breadCrumb1: HTMLElement = document.getElementById("goods__details__breadcrumb1")!;
    const breadCrumb2: HTMLElement = document.getElementById("goods__details__breadcrumb2")!;
    const breadCrumb3: HTMLElement = document.getElementById("goods__details__breadcrumb3")!;
    breadCrumb0.innerHTML = "";
    breadCrumb1.innerHTML = "";
    breadCrumb2.innerHTML = "";
    breadCrumb3.innerHTML = "";
    breadCrumb0.innerHTML = "MAIN";
    breadCrumb1.innerHTML = product!.category.toUpperCase();
    breadCrumb2.innerHTML = product!.brand.toUpperCase();
    breadCrumb3.innerHTML = product!.title.toUpperCase();
    breadCrumb0.addEventListener("click", () => {
      removeHash();
      displayNoneDetails();
      setNewPageURL("");
      displayBlocKMain();
    });

    const detailsHeader: HTMLElement = document.getElementById("goods__details__product__header")!;
    detailsHeader.innerHTML = "";
    detailsHeader.innerHTML = product!.title.toUpperCase();

    const picsBigWrapper: HTMLElement = document.getElementById("goods__details__product__minipicswrapper")!;
    picsBigWrapper.innerHTML = "";
    const imagesArray = product!.images;
    imagesArray.forEach(img => {
      let miniPicWrapper: HTMLElement = document.createElement("div");
      miniPicWrapper.innerHTML = "";
      miniPicWrapper.classList.add("goods__details__product__minipics_outer");
      let miniPic: HTMLElement = document.createElement("div");
      miniPic.classList.add("goods__details__product__minipics")
      miniPic.style.background = `url(${img}) 0% / cover`;
      miniPicWrapper.append(miniPic);
      picsBigWrapper.append(miniPicWrapper);
      miniPic.addEventListener("click", () => {
        info0Wrapper.innerHTML = "";
        info0Wrapper.append(info0Img);
        info0Img.style.background = "";
        info0Img.style.background = `url(${img}) 0% / cover`;
      })
    })

    const info0: HTMLElement = document.getElementById("goods__details__product__info0")!;
    info0.innerHTML = "";
    const info0Wrapper: HTMLElement = document.createElement("div");
    info0Wrapper.classList.add("product__info0_wrapper");
    const info0Img: HTMLElement = document.createElement("div");
    info0Img.classList.add("product__info0_img");
    info0Img.style.background = `url(${imagesArray[0]}) 0% / cover`;
    info0Wrapper.append(info0Img);
    info0.append(info0Wrapper);


    const info1: HTMLElement = document.getElementById("goods__details__product__info1")!;
    info1.innerHTML = "";
    const info1Wrapper: HTMLElement = document.createElement("div");
    info1Wrapper.classList.add("product__info1_wrapper");
    const info1desc: HTMLElement = document.createElement("div");
    info1desc.classList.add("infodesc");
    info1desc.innerHTML = "";
    info1desc.innerHTML = `<strong>Description:</strong>
    ${product!.description}`;

    const info2desc: HTMLElement = document.createElement("div");
    info2desc.classList.add("infodesc");
    info2desc.innerHTML = "";
    info2desc.innerHTML = `<strong>Discount Percentage:</strong>
    ${product!.discountPercentage}`;

    const info3desc: HTMLElement = document.createElement("div");
    info3desc.classList.add("infodesc");
    info3desc.innerHTML = "";
    info3desc.innerHTML = `<strong>Rating:</strong>
    ${product!.rating}`;

    const info4desc: HTMLElement = document.createElement("div");
    info4desc.classList.add("infodesc");
    info4desc.innerHTML = "";
    info4desc.innerHTML = `<strong>Stock:</strong>
    ${product!.stock}`;

    const info5desc: HTMLElement = document.createElement("div");
    info5desc.classList.add("infodesc");
    info5desc.innerHTML = "";
    info5desc.innerHTML = `<strong>Brand:</strong>
    ${product!.brand}`;

    const info6desc: HTMLElement = document.createElement("div");
    info6desc.classList.add("infodesc");
    info6desc.innerHTML = "";
    info6desc.innerHTML = `<strong>Category:</strong>
    ${product!.category}`;

    info1Wrapper.append(info1desc, info2desc, info3desc, info4desc, info5desc, info6desc);
    info1.append(info1Wrapper);

    const info2: HTMLElement = document.getElementById("goods__details__product__info2")!;
    info2.innerHTML = "";
    const info2Wrapper: HTMLElement = document.createElement("div");
    info2Wrapper.classList.add("product__info2_wrapper");
    const info2Price: HTMLElement = document.createElement("div");
    info2Price.classList.add("product__info2__price");
    info2Price.innerHTML = "";
    info2Price.innerHTML = `€ ${product!.price}`;
    const info2Cart: HTMLElement = document.createElement("div");
    // --------------------  Настя добавила класс "add-to-cart_descr" -----------------------------//
    info2Cart.classList.add("product__info2__cart", "button", "add-to-cart_descr");
    info2Cart.id = "product__info2__cart";
    info2Cart.innerHTML = "";
    info2Cart.innerHTML = "ADD TO CART";
    // adding event listener
    info2Cart.addEventListener("click", () => {
      if (info2Cart.innerHTML === "ADD TO CART"){
        info2Cart.innerHTML = "";
        info2Cart.innerHTML = "DROP FROM CART";
      } else if (info2Cart.innerHTML === "DROP FROM CART"){
        info2Cart.innerHTML = "";
        info2Cart.innerHTML = "ADD TO CART";
      }
    });
    const info2Buy: HTMLElement = document.createElement("div");
    info2Buy.classList.add("product__info2__buy", "button");
    info2Buy.id = "product__info2__buy";
    info2Buy.innerHTML = "";
    info2Buy.innerHTML = "BUY NOW";
    // adding event listener
    info2Buy.addEventListener("click", () => {
      if (info2Buy.innerHTML === "BUY NOW"){
        info2Buy.innerHTML = "";
        info2Buy.innerHTML = "Redirecting to Cart page...";
      } else {
        info2Buy.innerHTML = "";
        info2Buy.innerHTML = "BUY NOW";
      }
    });

    info2Wrapper.append(info2Price, info2Cart, info2Buy);
    info2.append(info2Wrapper);
    displayBlockDetails();

    // -----------------Настя добавила вызов функции для добавления товаров в корзину ---------------------//
    addGoodsToCart();
  }
}


export { openGoodsDescription }