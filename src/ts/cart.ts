import { ICartList, ICartGood } from './interfaces';
import { goodsList } from './goods-list';

let cartActive: boolean;

let cart: ICartList = []; //корзина с товарами
let idCartDescr: number;


function cartOpen () {
    const cartImg = document.querySelector('.basket') as HTMLDivElement;
    const cartPopUp = document.querySelector('.cart') as HTMLDivElement;
    const main = document.querySelector('.main') as HTMLElement;

    cartImg.addEventListener('click', () => {
        cartPopUp.classList.add('cart_active');
        main.classList.add('main_hidden');
    })
}


function cartClose () {
    const cartPopUp = document.querySelector('.cart') as HTMLDivElement;
    const logo = document.querySelector('.logo') as HTMLDivElement;
    const main = document.querySelector('.main') as HTMLElement;

    logo.addEventListener('click', () => {
        cartPopUp.classList.remove('cart_active');
        main.classList.remove('main_hidden');
    })
}


function addGoodsToCart () { //добавление и удаление товаров с главной страницы
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
                console.log('cart', cart);
            } else {
                let isInCart: boolean = false;
                for (let i = 0; i < cart.length; i ++) {
                    if (cart[i].id === id) {
                        isInCart = true;
                    }
                }
                if (isInCart === false) {
                    cart.push(currentAddGood);
                    console.log('cart', cart);
                } else {
                    const index: number = cart.indexOf(currentAddGood);
                    cart.splice(index, 1);
                    console.log('cart', cart);
                }
            }
        })
    }

    buttonAddToCardDescr?.addEventListener('click', () => {
        console.log('idCartDescr', idCartDescr)
        const id: number = idCartDescr;

        let currentAddGood = {} as ICartGood;
        currentAddGood.id = id;
        currentAddGood.count = 1;
        currentAddGood.price = goodsList[id -1].price;
        currentAddGood.totalPrice = currentAddGood.count * currentAddGood.price;
        currentAddGood.stock = goodsList[id -1].stock;

        if (cart.length === 0) {
            cart.push(currentAddGood);
            console.log('cart', cart);
        } else {
            let isInCart: boolean = false;
            for (let i = 0; i < cart.length; i ++) {
                if (cart[i].id === id) {
                    isInCart = true;
                }
            }
            if (isInCart === false) {
                cart.push(currentAddGood);
                console.log('cart', cart);
            } else {
                const index: number = cart.indexOf(currentAddGood);
                cart.splice(index, 1);
                console.log('cart', cart);
            }
        }
    })
}

function getIdGoodDescr () {
    const buttonShowDescr = document.querySelectorAll('.content__products__product__details') as NodeListOf<Node>;

    for (let i:number = 0; i < buttonShowDescr.length; i ++) {
        buttonShowDescr[i].addEventListener('click', () => {
            let element = buttonShowDescr[i] as HTMLElement;
            while (!element.classList.contains('content__products__product')) {
                if (element) {
                    element = element.parentElement as HTMLElement;
                }
                if (!element) {
                  break;
                }
            }
            const id: number = Number(element.id);
            idCartDescr = id;
        })
    }
}

// getIdGoodDescr();


cartOpen ();
cartClose ();

export { addGoodsToCart, getIdGoodDescr }
