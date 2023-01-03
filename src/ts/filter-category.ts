import { goodsList, IGoodsList } from './goods-list';

import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import {currentGoods, searchGoods, showGoods} from './show-goods';
import {paramsObject, setQueryParameters, removeQueryParameters} from './query-handler';
import {sortGoodsPriceUp, sortGoodsPriceDown, sortGoodsRatingUp, sortGoodsRatingDown} from './show-goods';
import { mainSearch } from './event-listeners';


let goodsForCategory: IGoodsList = []; //отфильтрованные товары по категории
let goodsForBrand: IGoodsList = []; //отфильтрованные товары по бренду
let goodsForPrice: IGoodsList = goodsList; //отфильтрованные товары по цене
let goodsForStock: IGoodsList = goodsList; //отфильтрованные товары по цене
const category: Array<string> = []; //выбранные категории фильтрации по категории
const brand: Array<string> = []; //выбранные категории фильтрации по бренду


function filterCategoryGoods () {
    const filtersCategoryItems = document.querySelector('.filters__category__items') as HTMLDivElement;
    const inputsCategory = filtersCategoryItems.querySelectorAll('input');

    for (let i = 0; i < inputsCategory.length; i++) {
        inputsCategory[i].addEventListener('click', () => {
            if (inputsCategory[i].checked) {
                category.push(inputsCategory[i].name);
                addCategoryGoods();

                if (paramsObject.sort === undefined) {
                    // showGoods(goodsForCategory);
                    showGoods(getGoodsResult());

                    console.log(getGoodsResult());
                } else {
                    if (paramsObject.sort === 'priceUp') {
                        sortGoodsPriceUp(getGoodsResult());
                    } else if (paramsObject.sort === 'priceDown') {
                        sortGoodsPriceDown(getGoodsResult());
                    } else if (paramsObject.sort === 'ratingUp') {
                        sortGoodsRatingUp(getGoodsResult());
                    } else if (paramsObject.sort === 'ratingDown') {
                        sortGoodsRatingDown(getGoodsResult());
                    }
                }


                changeShowGoodsCategory();
                changeShowGoodsBrand();

                // ----------------------- Строчка1, 2 Оли ---------------------------//
                // setQueryParameters("category", inputsCategory[i].name);
                // searchGoods(getGoodsResult(), mainSearch.value);
                
            } else {
                let index: number = category.indexOf(inputsCategory[i].name);
                category.splice(index, 1);
                removeFiltersGoods(inputsCategory[i].name);
                showGoods(getGoodsResult());

                // ----------------------- Строчка3, 4 Оли ---------------------------//
                // removeQueryParameters("category", inputsCategory[i].name);
                // searchGoods(getGoodsResult(), mainSearch.value);

                
                changeShowGoodsCategory();
                changeShowGoodsBrand()

            }
        })
    }
}


function filterBrandGoods () {
    const filtersBrandItems = document.querySelector('.filters__brand__items') as HTMLDivElement;
    const inputsBrand = filtersBrandItems.querySelectorAll('input');

    for (let i = 0; i < inputsBrand.length; i++) {
        inputsBrand[i].addEventListener('click', () => {
            if (inputsBrand[i].checked) {
                brand.push(inputsBrand[i].name);
                addBrandGoods();

                if (paramsObject.sort === undefined) {
                    showGoods(getGoodsResult());
                } else {
                    if (paramsObject.sort === 'priceUp') {
                        sortGoodsPriceUp(getGoodsResult());
                    } else if (paramsObject.sort === 'priceDown') {
                        sortGoodsPriceDown(getGoodsResult());
                    } else if (paramsObject.sort === 'ratingUp') {
                        sortGoodsRatingUp(getGoodsResult());
                    } else if (paramsObject.sort === 'ratingDown') {
                        sortGoodsRatingDown(getGoodsResult());
                    }
                }

                changeShowGoodsCategory();
                changeShowGoodsBrand()
                
                //вызов функции setQueryParameters(key, value)
            } else {
                let index: number = brand.indexOf(inputsBrand[i].name);
                brand.splice(index, 1);
                removeBrandGoods(inputsBrand[i].name);
                showGoods(getGoodsResult());

                changeShowGoodsCategory();
                changeShowGoodsBrand();

                //вызов функции removeQueryParameters(key, value)
            }
        })
    }
}


function addCategoryGoods () {
    for (let i = 0; i < goodsList.length; i ++) {
        if (category.includes(goodsList[i].category)) {
            if (!(goodsForCategory.includes(goodsList[i]))){
                goodsForCategory.push(goodsList[i]);
            }
        }
    }
}


function addBrandGoods () {
    for (let i = 0; i < goodsList.length; i ++) {
        if (brand.includes(goodsList[i].brand)) {
            if (!(goodsForBrand.includes(goodsList[i]))){
                goodsForBrand.push(goodsList[i]);
            }
        }
    }
}


function removeFiltersGoods(valueOfCategory: string) {
    goodsForCategory = goodsForCategory.filter(el => el.category !== valueOfCategory);
}


function removeBrandGoods(valueOfBrand: string) {
    goodsForBrand = goodsForBrand.filter(el => el.brand !== valueOfBrand);
}


let goodsResult: IGoodsList = [];


function getGoodsResult() {
    if (goodsForCategory.length === 0 && goodsForBrand.length === 0) {
        goodsResult = goodsList;
    } else if (goodsForCategory.length === 0) {
        goodsResult = goodsForBrand;
    } else if (goodsForBrand.length === 0) {
        goodsResult = goodsForCategory;
    } else if (goodsForBrand.length !== 0 && goodsForCategory.length !== 0) {
        goodsResult = goodsForCategory.filter(x => goodsForBrand.includes(x));
    } 

    if (goodsForPrice.length !== 0) {
        goodsResult = goodsForPrice.filter(x => goodsResult.includes(x));
    } else {
        goodsResult = [];
    }

    if (goodsForStock.length !== 0) {
        goodsResult = goodsForStock.filter(x => goodsResult.includes(x));
    } else {
        goodsResult = [];
    }

    // Оля добавила три строчки ниже, чтобы после отмены всех фильтров показывались товары
    // if (goodsResult.length === 0) {
        //return currentGoods;
    //}
    return goodsResult;
}

interface LFilterDict {
    [index: string]: number;
}

function changeShowGoodsCategory() { //изменение количества показанных товаров
    const filtersCategory = document.querySelector('.filters__category');
    const countShowGoods = filtersCategory?.querySelectorAll('.checkselect__count__show') as NodeListOf<Node>;

    for (let i = 0; i < countShowGoods?.length; i ++) {
        countShowGoods[i].textContent = '0';
    }
    
    let count;

    for (let j = 0; j < category.length; j ++) {
        count = 0;
        for (let i = 0; i < getGoodsResult().length; i ++) {
            if (getGoodsResult()[i].category.includes(category[j])) {
                count ++;
            }
        }
        
        let showCount = document.querySelector(`.${category[j]}`)?.querySelector('.checkselect__count__show');
        if (showCount) {
            showCount.textContent = String(count);
        }
    }

    if (category.length === 0 && brand.length === 0) {
        
        let categoryDict: LFilterDict = {};

        for (let j = 0; j < getGoodsResult().length; j ++) {
            let currentCategory: string = getGoodsResult()[j].category;

            if (!(currentCategory in categoryDict)) {
                categoryDict[currentCategory] = 1;
            } else {
                categoryDict[currentCategory] = categoryDict[currentCategory] + 1;
            }

            let showCountCategory = document.querySelector(`.${currentCategory}`)?.querySelector('.checkselect__count__show');
            if (showCountCategory) {
                showCountCategory.textContent = String(categoryDict[currentCategory]);
            }
        }
    }
}


function changeShowGoodsBrand() { //изменение количества показанных товаров
    const filtersBrand = document.querySelector('.filters__brand');
    const countShowGoods = filtersBrand?.querySelectorAll('.checkselect__count__show') as NodeListOf<Node>;

    for (let i = 0; i < countShowGoods?.length; i ++) {
        countShowGoods[i].textContent = '0';
    }
    
    let count;

    for (let j = 0; j < brand.length; j ++) {
        count = 0;
        for (let i = 0; i < getGoodsResult().length; i ++) {
            if (getGoodsResult()[i].brand.includes(brand[j])) {
                count ++;
            }
        }
        
        let showCount = document.querySelector(`#${brand[j]}`)?.querySelector('.checkselect__count__show');
        if (showCount) {
            showCount.textContent = String(count);
        }
    }

    if (category.length === 0 && brand.length === 0) {
        let brandDict: LFilterDict = {};

        for (let j = 0; j < getGoodsResult().length; j ++) {
            let currentBrand: string = getGoodsResult()[j].brand;

            if (!(currentBrand in brandDict)) {
                brandDict[currentBrand] = 1;
            } else {
                brandDict[currentBrand] = brandDict[currentBrand] + 1;
            }

            let showCountBrand = document.getElementById(`${currentBrand}`)?.querySelector('.checkselect__count__show');

            if (showCountBrand) {
                showCountBrand.textContent = String(brandDict[currentBrand]);
            }
        }
    }
}


// PriceSlider


function createPriceSlider () {
    const sliderPrice = document.querySelector('.filters__price');
    const snapSlider = document.querySelector('.slider-snap-price') as noUiSlider.target;
    const small = smallPrice();
    const big = bigPrice();
    

    noUiSlider.create(snapSlider, {
        start: [small, big],
        snap: false,
        connect: true,
        range: {
            'min': small,
            '10%': (big - small) * 0.1,
            '20%': (big - small) * 0.2,
            '30%': (big - small) * 0.3,
            '40%': (big - small) * 0.4,
            '50%': (big - small) * 0.5,
            '60%': (big - small) * 0.6,
            '70%': (big - small) * 0.7,
            '80%': (big - small) * 0.8,
            '90%': (big - small) * 0.9,
            'max': big
        }
    });

    const snapValues = [
        sliderPrice?.querySelector('.slider-snap-value-lower') as HTMLElement,
        sliderPrice?.querySelector('.slider-snap-value-upper') as HTMLElement
    ];

    if (snapSlider !== undefined) {
        snapSlider.noUiSlider?.on('update', function (values, handle) {
            if (snapValues) {
                snapValues[handle].innerHTML = values[handle] as string;
                let currentMinPrice = Number(snapValues[0].textContent);
                let currentMaxPrice = Number(snapValues[1].textContent);
                addPriceGoods(currentMinPrice, currentMaxPrice);
                showGoods(getGoodsResult());

                changeShowGoodsCategory();
                changeShowGoodsBrand();
            }
        });
    }
}


const smallPrice = function () {
    let sortPriceGoods = getGoodsResult().sort((a, b) => {return a.price - b.price});
    return sortPriceGoods[0].price;
}


const bigPrice = function () {
    let sortPriceGoods = getGoodsResult().sort((a, b) => {return a.price - b.price});
    return sortPriceGoods[sortPriceGoods.length - 1].price;
}


function addPriceGoods (min: number, max: number) {
    goodsForPrice = [];
    for (let i = 0; i < goodsList.length; i ++) {
        if (goodsList[i].price >= min && goodsList[i].price <= max) {
            goodsForPrice.push(goodsList[i])
        }
    }    
}

// Оля закомментила строчку ниже
//createPriceSlider();


// create stock slider

function createStockSlider () {
    const sliderStock = document.querySelector('.filters__stock');
    const snapSlider = sliderStock?.querySelector('.slider-snap-stock') as noUiSlider.target;
    const small = smallStock();
    const big = bigStock();
    

    noUiSlider.create(snapSlider, {
        start: [small, big],
        snap: false,
        connect: true,
        range: {
            'min': small,
            '10%': (big - small) * 0.1,
            '20%': (big - small) * 0.2,
            '30%': (big - small) * 0.3,
            '40%': (big - small) * 0.4,
            '50%': (big - small) * 0.5,
            '60%': (big - small) * 0.6,
            '70%': (big - small) * 0.7,
            '80%': (big - small) * 0.8,
            '90%': (big - small) * 0.9,
            'max': big
        }
    });

    const snapValues = [
        sliderStock?.querySelector('.slider-snap-value-lower') as HTMLElement,
        sliderStock?.querySelector('.slider-snap-value-upper') as HTMLElement
    ];

    if (snapSlider !== undefined) {
        snapSlider.noUiSlider?.on('update', function (values, handle) {
            if (snapValues) {
                snapValues[handle].innerHTML = values[handle] as string;
                let currentMinStock = Number(snapValues[0].textContent);
                let currentMaxStock = Number(snapValues[1].textContent);
                addStockGoods(currentMinStock, currentMaxStock);
                showGoods(getGoodsResult());

                changeShowGoodsCategory();
                changeShowGoodsBrand();
            }
        });
    }
}

const smallStock = function () {
    let sortStockGoods = getGoodsResult().sort((a, b) => {return a.stock - b.stock});
    return sortStockGoods[0].stock;
}

const bigStock = function () {
    let sortStockGoods = getGoodsResult().sort((a, b) => {return a.stock - b.stock});
    return sortStockGoods[sortStockGoods.length - 1].stock;
}

function addStockGoods (min: number, max: number) {
    goodsForStock = [];
    for (let i = 0; i < goodsList.length; i ++) {
        if (goodsList[i].stock >= min && goodsList[i].stock <= max) {
            goodsForStock.push(goodsList[i])
        }
    }
}

// ----------------------- Строчка5, 6, 7 Оли ---------------------------//
//filterCategoryGoods();
//filterBrandGoods();


export { goodsResult, filterCategoryGoods, filterBrandGoods, getGoodsResult, category, addCategoryGoods,
         changeShowGoodsCategory, changeShowGoodsBrand, brand, addBrandGoods, createPriceSlider, createStockSlider  }
