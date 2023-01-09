import { ICartList, ICartGood } from './interfaces';
import { goodsList } from './goods-list';
import { displayNoneMain, displayBlockDetails, displayBlocKMain, displayNoneDetails } from './hide-display-sections';
import { setNewPageURL, removeHash } from './query-handler';
import { calculateTotalPrice } from './promo-code';
import { IOneProduct, IShowDescreaseButton } from './interfaces';


let cart: ICartList = []; //корзина с товарами
let idCartDescr: number;


function cartOpen () {
    const cartImg = document.querySelector('.basket') as HTMLDivElement;
    const cartPopUp = document.querySelector('.cart') as HTMLDivElement;
    const main = document.querySelector('.main') as HTMLElement;
    const goodsDetails = document.querySelector('.goods__details') as HTMLElement;

    cartImg.addEventListener('click', () => {
        cartPopUp.classList.add('cart_active');
        main.classList.add('main_hidden');
        goodsDetails.style.display = 'none';
        // Оля добавила три строчки снизу
        removeHash();
        setNewPageURL("cart");
        displayNoneMain();
        setPaginationLimitValue();
        showPageChangeButtons(increasePage, decreasePage);
    })
}


function cartClose () {
    const cartPopUp = document.querySelector('.cart') as HTMLDivElement;
    const logo = document.querySelector('.logo') as HTMLDivElement;
    const main = document.querySelector('.main') as HTMLElement;
    const goodsDetails = document.querySelector('.goods__details') as HTMLElement;

    logo.addEventListener('click', () => {
        cartPopUp.classList.remove('cart_active');
        main.classList.remove('main_hidden');
        goodsDetails.style.display = 'block';
    })
}


function addGoodsToCart () { //добавление и удаление товаров с главной страницы, со страницы описания товаров
    const buttonAddToCard = document.querySelectorAll('.add-to-cart') as NodeListOf<Node>;
    const buttonAddToCardDescr = document.querySelector('.add-to-cart_descr') as HTMLDivElement;

    for (let i:number = 0; i < buttonAddToCard.length; i ++) {
        buttonAddToCard[i].addEventListener('click', () => {
            let element = buttonAddToCard[i] as HTMLElement;
            while (!element.classList.contains('content__products__product')) {
                if (element) {
                    element = element.parentElement as HTMLElement;
                }
                if (!element) {
                  break;
                }
            }

            const id: number = Number(element.id);
            let currentAddGood = {} as ICartGood;
            currentAddGood.id = id;
            currentAddGood.count = 1;
            currentAddGood.price = goodsList[id -1].price;
            currentAddGood.totalPrice = currentAddGood.count * currentAddGood.price;
            currentAddGood.stock = goodsList[id -1].stock;
            
            if (cart.length === 0) {
                cart.push(currentAddGood);

                showGoodsInCart(currentPage);
                showTotalCount();
                showTotalPrice();
            } else {
                let isInCart: boolean = false;
                for (let i = 0; i < cart.length; i ++) {
                    if (cart[i].id === id) {
                        isInCart = true;
                    }
                }
                if (isInCart === false) {
                    cart.push(currentAddGood);

                    showGoodsInCart(currentPage);
                    showTotalCount();
                    showTotalPrice();
                } else {
                    const index = cart.findIndex(currentAddGood => currentAddGood.id === id);
                    cart.splice(index, 1);

                    showGoodsInCart(currentPage);
                    showTotalCount();
                    showTotalPrice();
                }
            }
            calculateTotalPrice();
        })
    }

    buttonAddToCardDescr?.addEventListener('click', () => {
        getIdGoodDescr();
        const id: number = idCartDescr;
        let currentAddGood = {} as ICartGood;
        currentAddGood.id = id;
        currentAddGood.count = 1;
        currentAddGood.price = goodsList[id -1].price;
        currentAddGood.totalPrice = currentAddGood.count * currentAddGood.price;
        currentAddGood.stock = goodsList[id -1].stock;

        if (cart.length === 0) {
            cart.push(currentAddGood);

            showGoodsInCart(currentPage);
            showTotalCount();
            showTotalPrice();
        } else {
            let isInCart: boolean = false;
            for (let i = 0; i < cart.length; i ++) {
                if (cart[i].id === id) {
                    isInCart = true;
                }
            }
            if (isInCart === false) {
                cart.push(currentAddGood);

                showGoodsInCart(currentPage);
                showTotalCount();
                showTotalPrice();
            } else {
                const index = cart.findIndex(currentAddGood => currentAddGood.id === id);
                cart.splice(index, 1);

                showGoodsInCart(currentPage);
                showTotalCount();
                showTotalPrice();
            }
        }
        calculateTotalPrice();
    })
}

function getIdGoodDescr () {

    const cardProduct = document.querySelector('.goods__details__product') as HTMLDivElement;
    const nameProduct = cardProduct.querySelector('.goods__details__product__header')?.textContent as string;
    const product = goodsList.find(obj => obj.title.toLowerCase() === nameProduct.toLowerCase());

    if (product) {
        const id: number = Number(product.id);
        idCartDescr = id;
    }
}

// Оля модифицировала эту функцию для работы пагинации
function showGoodsInCart(localCurrentPage: number) {
    const cartItems = document.querySelector('.cart__items') as HTMLDivElement;

    while (cartItems.firstChild) {
        cartItems.removeChild(cartItems.firstChild);
    }
    console.log("paginationLimitValue in showGoodsInCart:", paginationLimitValue, "currentPage:", currentPage);
    // for (let i = 0; i < cart.length; i ++)
    for (let i = (localCurrentPage - 1) * paginationLimitValue; i < (localCurrentPage * paginationLimitValue) && i < cart.length; i ++) {

        const id: number = cart[i].id;
        const images = goodsList[id - 1].images;
        const title: string = goodsList[id - 1].title;
        
        const description: string = goodsList[id - 1].description;
        const rating: number = goodsList[id - 1].rating;
        const discount: number = goodsList[id - 1].discountPercentage;
        const stock: number = goodsList[id - 1].stock;
        const price: number = goodsList[id - 1].price;
        const totalPrice: number = cart[i].totalPrice;
        const count: number = cart[i].count;

        const divItemFromCart = document.createElement('div') as HTMLDivElement;
        divItemFromCart.classList.add('cart__item');

        const divNumber = document.createElement('div') as HTMLDivElement;
        divNumber.classList.add('cart__item__number');
        divNumber.textContent = String(i + 1);

        const divImg = document.createElement('div') as HTMLDivElement;
        divImg.classList.add('cart__item__img');
        divImg.style.backgroundImage = `url(${images[0]})`;

        const divWrapper = document.createElement('div') as HTMLDivElement;
        divWrapper.classList.add('cart__item__wrapper');

        const divTitle = document.createElement('div') as HTMLDivElement;
        divTitle.classList.add('cart__item__title');
        divTitle.textContent = `${title}`;

        const divDescription = document.createElement('div') as HTMLDivElement;
        divDescription.classList.add('cart__item__description');
        divDescription.textContent = `${description}`;

        const divContainer = document.createElement('div') as HTMLDivElement;
        divContainer.classList.add('cart__item__container');

        const divRating = document.createElement('div') as HTMLDivElement;
        divRating.classList.add('cart__item__rating');
        divRating.textContent = `Rating: ${rating}`;

        const divDiscount= document.createElement('div') as HTMLDivElement;
        divDiscount.classList.add('cart__item__discount');
        divDiscount.textContent = `Discount: ${discount}%`;

        const divWrapper2 = document.createElement('div') as HTMLDivElement;
        divWrapper2.classList.add('cart__item__wrapper__second');

        const divStock = document.createElement('div') as HTMLDivElement;
        divStock.classList.add('cart__item__stock');
        divStock.textContent = `Stock: ${stock}`;

        const divContainer2 = document.createElement('div') as HTMLDivElement;
        divContainer2.classList.add('cart__item__container__second');

        const divSmaller = document.createElement('div') as HTMLDivElement;
        divSmaller.classList.add('cart__item__smaller');
        divSmaller.textContent = '-';

        const divCount = document.createElement('div') as HTMLDivElement;
        divCount.classList.add('cart__item__count');
        divCount.textContent = String(count);

        const divMore = document.createElement('div') as HTMLDivElement;
        divMore.classList.add('cart__item__more');
        divMore.textContent = '+';

        const divTotalPrice = document.createElement('div') as HTMLDivElement;
        divTotalPrice.classList.add('cart__item__total-price');
        divTotalPrice.textContent = `€ ${totalPrice}`;

        cartItems.appendChild(divItemFromCart);
        divItemFromCart.appendChild(divNumber);
        divItemFromCart.appendChild(divImg);
        divItemFromCart.appendChild(divWrapper);
        divWrapper.appendChild(divTitle);
        divWrapper.appendChild(divDescription);
        divWrapper.appendChild(divContainer);
        divContainer.appendChild(divRating);
        divContainer.appendChild(divDiscount);
        divItemFromCart.appendChild(divWrapper2);
        divWrapper2.appendChild(divStock);
        divWrapper2.appendChild(divContainer2);
        divContainer2.appendChild(divSmaller);
        divContainer2.appendChild(divCount);
        divContainer2.appendChild(divMore);
        divWrapper2.appendChild(divTotalPrice);
    }
    addGoodsInCart();
    removeGoodsInCart();
    setInitialPaginationLimit();
}


let totalCount: number;
let totalPrice: number;


function countItemsCart () {
    totalCount = 0;
    for (let i = 0; i < cart.length; i++) {
        totalCount = totalCount + cart[i].count;
    }
    return totalCount;
}


function showTotalCount () {
    const headerCount = document.querySelector('.basket__value') as HTMLDivElement;
    const cartCount = document.querySelector('.cart__summary__count__value') as HTMLDivElement;

    if (headerCount) {
        headerCount.textContent = String(countItemsCart());
    }

    if (cartCount) {
        cartCount.textContent = String(countItemsCart());
    }
}


function countTotalPrice () {
    totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        totalPrice = totalPrice + cart[i].totalPrice;
    }
    return totalPrice;
}


function showTotalPrice () {
    const headerTotalPrice = document.querySelector('.total-card__value') as HTMLDivElement;
    const cartTotalPrice = document.querySelector('.cart__summary__total__value') as HTMLDivElement;

    if (headerTotalPrice) {
        headerTotalPrice.textContent = String(countTotalPrice());
    }

    if (cartTotalPrice) {
        cartTotalPrice.textContent = '€ ' + String(countTotalPrice());
    }
}


function addGoodsInCart () {
    const buttonsMore = document.querySelectorAll('.cart__item__more') as NodeListOf<Node>;

    for (let i = 0; i < buttonsMore.length; i++) {
        buttonsMore[i].addEventListener('click', () => {

            let goodCard = buttonsMore[i] as HTMLElement;

            while (!goodCard.classList.contains('cart__item')) {
                if (goodCard) {
                    goodCard = goodCard.parentElement as HTMLElement;
                }
                if (!goodCard) {
                  break;
                }
            }

            let number: number = Number(goodCard.querySelector('.cart__item__number')?.textContent) - 1;

            if (cart[number].stock > cart[number].count) { 
                cart[number].count ++;
                cart[number].totalPrice = cart[number].count * cart[number].price;
                showTotalPrice();
                showTotalCount();

                const countGood = goodCard.querySelector('.cart__item__count') as HTMLDivElement;

                if (countGood) {
                    countGood.textContent = String(cart[number].count);
                }

                const totalPriceGood = goodCard.querySelector('.cart__item__total-price') as HTMLDivElement;

                if (totalPriceGood) {
                    totalPriceGood.textContent = String(cart[number].totalPrice);
                }
            }
            calculateTotalPrice();
            setInitialPaginationLimit();
        }) 
    }
}


function removeGoodsInCart () {
    const buttonsSmaller = document.querySelectorAll('.cart__item__smaller') as NodeListOf<Node>;

    for (let i = 0; i < buttonsSmaller.length; i++) {
        buttonsSmaller[i].addEventListener('click', () => {
            
            let goodCard = buttonsSmaller[i] as HTMLElement;

            while (!goodCard.classList.contains('cart__item')) {
                if (goodCard) {
                    goodCard = goodCard.parentElement as HTMLElement;
                }
                if (!goodCard) {
                  break;
                }
            }

            let number: number = Number(goodCard.querySelector('.cart__item__number')?.textContent) - 1;

            if (cart[number].count > 0) { 
                cart[number].count --;


                // if (cart[number].count === 0) {
                //     cart.splice(number, 1);
                //     showGoodsInCart(currentPage);
                //     showTotalPrice();
                //     showTotalCount();
                // }


                cart[number].totalPrice = cart[number].count * cart[number].price;
                showTotalPrice();
                showTotalCount();

                const countGood = goodCard.querySelector('.cart__item__count') as HTMLDivElement;

                if (countGood) {
                    countGood.textContent = String(cart[number].count);
                }

                const totalPriceGood = goodCard.querySelector('.cart__item__total-price') as HTMLDivElement;

                if (totalPriceGood) {
                    totalPriceGood.textContent = String(cart[number].totalPrice);
                }

                if (cart[number].count === 0) {
                    cart.splice(number, 1);
                    checkPageAfterProductRemoval();
                    showGoodsInCart(currentPage);
                    showTotalPrice();
                    showTotalCount();
                }
            }
            calculateTotalPrice();
            setInitialPaginationLimit();
        }) 
    }
}


// saving current cart in localStorage 
document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
        if (cart.length > 0) {
            localStorage.bestGoodsObjectEver = JSON.stringify(cart);
        } else if (cart.length === 0) {
            localStorage.bestGoodsObjectEver = JSON.stringify([]);
        }
    }
})
   
window.addEventListener("DOMContentLoaded", () => {
    if (window.location.hash[1] === "c"){
        parseQueryCart();
        //showPageChangeButtons(increasePage, decreasePage);
    } else {
        setInitialPaginationLimit();
    }

    if (JSON.parse(localStorage.bestGoodsObjectEver).length > 0){
        cart = JSON.parse(localStorage.bestGoodsObjectEver);
        showTotalPrice();
        showTotalCount();
        showGoodsInCart(currentPage);
    }

    listenPaginationArrows();
    listenPageChange();
})

// pagination
let paginationLimitValue: number;
const paginationHTML: HTMLInputElement = document.getElementById("cart__limit__input") as HTMLInputElement;

let currentPage: number = 1;
const pageNumberHTML: HTMLElement = document.getElementById("cart__page__value") as HTMLElement;
const increasePage: HTMLElement = document.getElementById("cart__page__next") as HTMLElement;
const decreasePage: HTMLElement = document.getElementById("cart__page__back") as HTMLElement;

// setting pagination limit
const setInitialPaginationLimit: () => void = function() {

    if (paginationLimitValue === undefined){
        paginationLimitValue = 5;
        paginationHTML.setAttribute("value", paginationLimitValue.toString());
        paginationHTML.max = "";
        paginationHTML.max = cart.length.toString();
    } else {
        setPaginationLimitValue();
    }
    console.log("paginationLimitValue after setting", paginationLimitValue);
} 

const setPaginationLimitValue: () => void = function() {
    paginationLimitValue = Number(paginationHTML.value);
    paginationHTML.setAttribute("value", paginationLimitValue.toString());
    if (cart.length <= 5) {
        paginationHTML.max = "";
        paginationHTML.max = "5";
    } else {
        paginationHTML.max = "";
        paginationHTML.max = cart.length.toString();
    }

    let params = new URLSearchParams(window.location.search);
    params.set("limit", `${paginationLimitValue}`);
    params.set("page", `${currentPage}`);
    if (window.location.hash[1] === "c"){
        window.history.pushState({}, "", `?${params.toString()}#cart`);
    }
}

// increasing and decreasing pagination limit by pressing on the corresponding arrows or keys
const listenPaginationArrows: () => void = function() {
    paginationHTML.addEventListener("change", () => {
        setPaginationLimitValue();
        checkPageAfterLimitIncrease();
        showGoodsInCart(currentPage);
        showPageChangeButtons(increasePage, decreasePage);
    })
}

// listening to clicks to change the page number
const listenPageChange: () => void = function() {
    if (currentPage === 1){
        decreasePage.style.visibility = "hidden";
    }
    pageNumberHTML.textContent = currentPage.toString();
    //console.log(currentPage);
    increasePage.addEventListener("click", () => {
        currentPage++;
        showPageChangeButtons(increasePage, decreasePage);
        showGoodsInCart(currentPage);
        //console.log(currentPage);
    })
    decreasePage.addEventListener("click", () => {
        //console.log("page number decreased");
        currentPage--;
        showPageChangeButtons(increasePage, decreasePage);
        showGoodsInCart(currentPage);
    })
}

// changing the currentPage number; determining whether to allow to increase or descrease the page number
const showPageChangeButtons: IShowDescreaseButton = function(localIncreasePage, localDescreasePage) {
    if (currentPage === 1) {
        localDescreasePage.style.visibility = "hidden";
    } else {
        localDescreasePage.style.visibility = "visible";
    }

    if (currentPage >= Math.ceil(cart.length / paginationLimitValue)) {
        localIncreasePage.style.visibility = "hidden";
    } else {
        localIncreasePage.style.visibility = "visible";
    }
    pageNumberHTML.textContent = currentPage.toString();
}

// checking if the page must be decreased after a product is removed from the cart
const checkPageAfterProductRemoval: () => void = function() {
    if ((currentPage - 1) * paginationLimitValue === (cart.length) && currentPage !== 1) {
        currentPage = Math.ceil(cart.length / paginationLimitValue);
        pageNumberHTML.textContent = "";
        pageNumberHTML.textContent = currentPage.toString();
    }
}

const checkPageAfterLimitIncrease: () => void = function() {
    if ((currentPage - 1) * paginationLimitValue >= (cart.length) && currentPage !== 1) {
        currentPage = Math.ceil(cart.length / paginationLimitValue);
        pageNumberHTML.textContent = "";
        pageNumberHTML.textContent = currentPage.toString();
    }
}

//
const parseQueryCart: () => void = function() {    
    const cartPopUp = document.querySelector('.cart') as HTMLDivElement;
    cartPopUp.classList.add('cart_active');
    setNewPageURL("cart");
    displayNoneMain();
    displayNoneDetails();

    if (window.location.search[0] === "?" && window.location.hash[1] === "c"){
        //console.log('hash[1] === "c"')
        let params = new URLSearchParams(document.location.search);

        if (params.get("limit") === null) {
            paginationLimitValue = 5;
        } 

        if (params.get("page") === null) {
            currentPage = 1;
        }

        if (params.get("limit") !== null){
            if(!(Number(params.get("limit")) > 0)){
                paginationLimitValue = 5;
            } else {
                paginationLimitValue = Number(params.get("limit"));
            }
        }
        paginationHTML.setAttribute("value", paginationLimitValue.toString());
        paginationLimitValue = Number(paginationHTML.value);
        //console.log("Limit in HASH", paginationLimitValue);

        if (params.get("page") !== null){
            if(!(Number(params.get("page")) > 0)){
                currentPage = 1;
            } else {
                currentPage = Number(params.get("page"));
            }
            //console.log("Page in HASH", currentPage);
        }
        window.history.pushState({}, "", "#cart");
        window.history.pushState({}, "", `?limit=${paginationLimitValue}&page=${currentPage}#cart`);
    }
}


// show "Cart is Empty"
//const checkIfCartEmpty


cartOpen ();
cartClose ();

export { addGoodsToCart, getIdGoodDescr, cart, cartOpen, parseQueryCart, increasePage, decreasePage, setPaginationLimitValue,
         showPageChangeButtons, showGoodsInCart, currentPage, showTotalCount, showTotalPrice }
