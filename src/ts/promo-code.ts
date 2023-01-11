import { IPromoCode } from "./interfaces";
import { cart } from "./cart";

const promo: IPromoCode = [
    {value: 'NASTYA',
    discount: 10},
    {value: 'OLYA',
    discount: 10},
];

const applayPromo: Array<string> = [];
let summaryDuscount: number = 0;

function promoEnter () {
    const inputPromo = document.querySelector('.cart__summary__promo') as HTMLInputElement;
    let currentString: string = '';

    inputPromo.addEventListener('input', () => {
        currentString = inputPromo.value.toUpperCase();
        const currentObject = promo.find(obj => obj.value.toUpperCase() === currentString.toUpperCase());
        if (currentObject) {
            //сравнить с массивом примененных промо
            promoShow(currentObject.value, currentObject.discount);
            promoApply(currentObject.value, currentObject.discount);
        } else {
            if (document.querySelector('.cart__summary__promo__box')) {
                console.log('delete')
                document.querySelector('.cart__summary__promo__box')?.remove();
            }
        }
    })
}


function promoShow (promo: string, discount: number) {
    if (!(applayPromo.includes(promo))) {

        const promoBlock = document.querySelector('.cart__summary__promo-box');
        console.log(promoBlock)

        const divPromoContainer = document.createElement('div') as HTMLDivElement;
        divPromoContainer.classList.add('cart__summary__promo__box');

        const divPromoText = document.createElement('div') as HTMLDivElement;
        divPromoText.classList.add('cart__summary__promo__text');
        divPromoText.textContent = `${promo} - ${discount}%`;

        const divButton = document.createElement('div') as HTMLDivElement;
        divButton.classList.add('cart__summary__promo__button');
        divButton.classList.add('button');
        divButton.textContent = 'ADD';

        promoBlock?.appendChild(divPromoContainer);
        divPromoContainer.appendChild(divPromoText);
        divPromoContainer.appendChild(divButton);
    }
}


function promoApply (promo: string, discount: number) {
    const promoButton = document.querySelector('.cart__summary__promo__button') as HTMLDivElement;
    const promoApply = document.querySelector('.cart__summary__promo-applay-box') as HTMLDivElement;

    if (!(applayPromo.includes(promo))) {
        promoButton.addEventListener('click', () => {

            if (!document.querySelector('.applay-title')) {
                const titlePromoApply = document.createElement('div') as HTMLDivElement;
                titlePromoApply.classList.add('applay-title');
                titlePromoApply.textContent = 'Applied codes';
                promoApply.appendChild(titlePromoApply);
            }

            const divPromoContainer = document.createElement('div') as HTMLDivElement;
            divPromoContainer.classList.add('applay-container');

            const divPromoText = document.createElement('div') as HTMLDivElement;
            divPromoText.classList.add('applay-text');
            divPromoText.textContent = `${promo} - ${discount}%`;

            // const divButton = document.createElement('div') as HTMLDivElement;
            // divButton.classList.add('remove-button');
            // divButton.id = `${promo}`;
            // divButton.classList.add('button');
            // divButton.textContent = 'DROP';

            promoApply.appendChild(divPromoContainer);
            divPromoContainer.appendChild(divPromoText);
            // divPromoContainer.appendChild(divButton);
            promoApply.classList.add('cart__summary_border');

            document.querySelector('.cart__summary__promo__box')?.remove();
            applayPromo.push(promo);
            console.log(applayPromo);
            summaryDuscount += discount / 100;
            calculateTotalPrice();
            // promoRemove();
        })
    }
}


// function promoRemove () {
//     const buttonsRemove = document.querySelectorAll('.remove-button') as NodeListOf<Node>;
//     console.log(buttonsRemove.length);

//     for (let i: number = 0; i < buttonsRemove.length; i ++) {
//         buttonsRemove[i].addEventListener('click', () => {
//             const parent = buttonsRemove[i].parentElement as HTMLDivElement;
//             const id = parent.querySelector('.remove-button')?.id as string;
//             const discount = Number((promo.find(obj => obj.value.toUpperCase() === id.toUpperCase()))?.discount);
//             console.log(id);
//             const index = applayPromo.indexOf(id);
//             console.log(index);
//             console.log('applayPromo before', applayPromo)
//             applayPromo.splice(index, 1);
//             console.log('applayPromo after', applayPromo)
//             promoShow(id, discount);
//             applayPromo.push(id);
//             summaryDuscount -= discount / 100;
//             console.log(summaryDuscount)
//             calculateTotalPrice();
//             promoApply(id, discount);
//             parent.remove();
//             console.log('applayPromo', applayPromo);
//         })
//     }
// }


function calculateTotalPrice () {
    const totalPrice = document.querySelector('.cart__summary__total__value') as HTMLDivElement;
    const totalPriceFull: number = Number(document.querySelector('.total-card__value')?.textContent);
    const totalPriceDiscount = document.querySelector('.cart__summary__total__discount') as HTMLDivElement;

    const discountPrice: number = Number((totalPriceFull * (1 - summaryDuscount)).toFixed(1));
    
    if (discountPrice !== totalPriceFull) {
        totalPrice.style.textDecoration = 'line-through';
        if (totalPriceDiscount) {
            totalPriceDiscount.textContent = String(discountPrice);
        }
    } else {
        totalPrice.style.textDecoration = 'none';
        totalPriceDiscount.textContent = '';
    }
}

promoEnter();

export { calculateTotalPrice };