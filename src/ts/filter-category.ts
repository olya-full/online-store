import { goodsList, IGoodsList } from './goods-list';
import {currentGoods, searchGoods, showGoods} from './show-goods';
import {paramsObject, setQueryParameters, removeQueryParameters} from './query-handler';
import {sortGoodsPriceUp, sortGoodsPriceDown, sortGoodsRatingUp, sortGoodsRatingDown} from './show-goods';
import { mainSearch } from './event-listeners';


let goodsForCategory: IGoodsList = []; //отфильтрованные товары по категории
let goodsForBrand: IGoodsList = []; //отфильтрованные товары по бренду
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

                } else {
                    // console.log('goodsResult', goodsResult)
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

                // Оля раскомментила функцию на строчке ниже, чтобы проверить, что она работает. она работает ;)
                setQueryParameters("category", inputsCategory[i].name);
                // Оля добавила search на строчке ниже, чтобы поиск работал после применения фильтра
                searchGoods(getGoodsResult(), mainSearch.value);
            } else {
                let index: number = category.indexOf(inputsCategory[i].name);
                category.splice(index, 1);
                removeFiltersGoods(inputsCategory[i].name);
                showGoods(getGoodsResult());

                // Оля раскомментила функцию на строчке ниже, чтобы проверить, что она работает. она работает ;)
                removeQueryParameters("category", inputsCategory[i].name);
                // Оля добавила search на строчке ниже, чтобы поиск работал после отмены применения фильтра
                searchGoods(getGoodsResult(), mainSearch.value);

                

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
        goodsResult = [];
    } else if (goodsForCategory.length === 0) {
        goodsResult = goodsForBrand;
    } else if (goodsForBrand.length === 0) {
        goodsResult = goodsForCategory;
    } else {
        goodsResult = goodsForCategory.filter(x => goodsForBrand.includes(x));
    }
    // Оля добавила три строчки ниже, чтобы после отмены всех фильтров показывались товары
    if (goodsResult.length === 0) {
        return currentGoods;
    }
    return goodsResult;
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
}

// Оля это закомментила :Р
//filterCategoryGoods();
//filterBrandGoods();

export { goodsResult, filterCategoryGoods, filterBrandGoods, getGoodsResult }



