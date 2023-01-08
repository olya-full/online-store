import { ICartList, ICartGood } from './interfaces';
import { goodsList } from './goods-list';
import { displayNoneMain, displayBlockDetails, displayBlocKMain, displayNoneDetails } from './hide-display-sections';
import { setNewPageURL, removeHash } from './query-handler';
import { IOneProduct } from './interfaces';

let cartActive: boolean;

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
        setNewPageURL(`cart`);
        displayNoneMain();
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

                showGoodsInCart();
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

                    showGoodsInCart();
                    showTotalCount();
                    showTotalPrice();
                } else {
                    const index = cart.findIndex(currentAddGood => currentAddGood.id === id);
                    cart.splice(index, 1);

                    showGoodsInCart();
                    showTotalCount();
                    showTotalPrice();
                }
            }
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

            showGoodsInCart();
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

                showGoodsInCart();
                showTotalCount();
                showTotalPrice();
            } else {
                const index = cart.findIndex(currentAddGood => currentAddGood.id === id);
                cart.splice(index, 1);

                showGoodsInCart();
                showTotalCount();
                showTotalPrice();
            }
        }
    })
}

function getIdGoodDescr () {
    // const cardGood = document.querySelectorAll('.content__products__product__wrapper') as NodeListOf<Node>;

    // for (let i:number = 0; i < cardGood.length; i ++) {
    //     cardGood[i].addEventListener('click', () => {
    //         let element = cardGood[i] as HTMLElement;
    //         let elementId = element.querySelector('.content__products__product') as HTMLElement; 
    //         const id: number = Number(elementId.id);
    //         idCartDescr = id;
    //     })
    // }

    const cardProduct = document.querySelector('.goods__details__product') as HTMLDivElement;
    const nameProduct = cardProduct.querySelector('.goods__details__product__header')?.textContent as string;
    const product = goodsList.find(obj => obj.title.toLowerCase() === nameProduct.toLowerCase());

    if (product) {
        const id: number = Number(product.id);
        idCartDescr = id;
    }
}


function showGoodsInCart() {
    const cartItems = document.querySelector('.cart__items') as HTMLDivElement;

    while (cartItems.firstChild) {
        cartItems.removeChild(cartItems.firstChild);
    }
    
    for (let i = 0; i < cart.length; i ++) {

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
    if (headerCount) {
        headerCount.textContent = String(countItemsCart());
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
    if (headerTotalPrice) {
        headerTotalPrice.textContent = String(countTotalPrice());
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
                //     showGoodsInCart();
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
                    showGoodsInCart();
                    showTotalPrice();
                    showTotalCount();
                }
            }
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
    if (JSON.parse(localStorage.bestGoodsObjectEver).length > 0){
        cart = JSON.parse(localStorage.bestGoodsObjectEver);
        showTotalPrice();
        showTotalCount();
        showGoodsInCart();
    }
})



cartOpen ();
cartClose ();

export { addGoodsToCart, getIdGoodDescr, cart, cartOpen }
