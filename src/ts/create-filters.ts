import { goodsList, IGoodsList } from './goods-list';

// -------------- Строчка1 Оли? -------------------//
// import { goodsResult } from './filter-category';
// import { filterCategoryGoods, filterBrandGoods } from './filter-category';


function createCategoryFilters () {
    const categoryItems: Array<string> = [];
    const filtersCategory = document.querySelector('.filters__category');

    for (let i=0; i < goodsList.length; i++) {
        if (!(categoryItems.includes(goodsList[i].category))) {
            categoryItems.push(goodsList[i].category);
        }
    }

    const divCheckselect = document.createElement('div') as HTMLDivElement;
    divCheckselect.classList.add('checkselect');
    divCheckselect.classList.add('filters__category__items');

    for (let i=0; i < categoryItems.length; i++) {
        const label = document.createElement('label') as HTMLLabelElement;
        label.classList.add(categoryItems[i]);

        const input = document.createElement('input') as HTMLInputElement;
        input.type = 'checkbox';
        input.name = categoryItems[i];
        input.value = categoryItems[i];

        const div = document.createElement('div') as HTMLDivElement;
        div.classList.add('checkselect__items');
        div.textContent = categoryItems[i];

        const divCount = document.createElement('div') as HTMLDivElement;
        divCount.classList.add('checkselect__count');
        
        const divCountAll = document.createElement('div') as HTMLDivElement;
        divCountAll.classList.add('checkselect__count__all');
        divCountAll.textContent = String(countCategoryGoodsAll(categoryItems[i]));
        
        const divSeparator = document.createElement('div') as HTMLDivElement;
        divSeparator.textContent = '/';

        const divShow = document.createElement('div') as HTMLDivElement;
        divShow.classList.add('checkselect__count__show');
        // console.log(categoryItems[i])
        // console.log(String(countCategoryGoodsShow(categoryItems[i], goodsList)))
        divShow.textContent = String(countCategoryGoodsShow(categoryItems[i], goodsList));

        label.appendChild(input);
        label.appendChild(div);
        label.appendChild(divCount);
        divCount.appendChild(divShow);
        divCount.appendChild(divSeparator);
        divCount.appendChild(divCountAll);
        divCheckselect.appendChild(label);
    }

    filtersCategory?.appendChild(divCheckselect);
    
    // -------------- Строчка2 Оли? -------------------//
    //filterCategoryGoods ();
}


function createBrandFilters () {
    const brandItems: Array<string> = [];
    const filtersBrand = document.querySelector('.filters__brand');

    for (let i=0; i < goodsList.length; i++) {
        if (!(brandItems.includes(goodsList[i].brand))) {
            brandItems.push(goodsList[i].brand)
        }
    }

    const divCheckselect = document.createElement('div') as HTMLDivElement;
    divCheckselect.classList.add('checkselect');
    divCheckselect.classList.add('filters__brand__items');

    for (let i=0; i < brandItems.length; i++) {
        const label = document.createElement('label') as HTMLLabelElement;
        // label.classList.add(brandItems[i]);
        label.id = brandItems[i];

        // const label = document.createElement('label') as HTMLLabelElement;
        // label.classList.add(categoryItems[i]);

        const input = document.createElement('input') as HTMLInputElement;
        input.type = 'checkbox';
        input.name = brandItems[i];
        input.value = brandItems[i];

        const div = document.createElement('div') as HTMLDivElement;
        div.classList.add('checkselect__items');
        div.textContent = brandItems[i];

        const divCount = document.createElement('div') as HTMLDivElement;
        divCount.classList.add('checkselect__count');
        
        const divCountAll = document.createElement('div') as HTMLDivElement;
        divCountAll.classList.add('checkselect__count__stok');
        divCountAll.textContent = String(countBrandGoodsAll(brandItems[i]));

        const divSeparator = document.createElement('div') as HTMLDivElement;
        divSeparator.textContent = '/';

        const divShow = document.createElement('div') as HTMLDivElement;
        divShow.classList.add('checkselect__count__show');
        divShow.textContent = String(countBrandGoodsShow(brandItems[i], goodsList));

        label.appendChild(input);
        label.appendChild(div);
        label.appendChild(divCount);
        divCount.appendChild(divShow);
        divCount.appendChild(divSeparator);
        divCount.appendChild(divCountAll);
        divCheckselect.appendChild(label);
    }

    filtersBrand?.appendChild(divCheckselect);
    
    // -------------- Строчка3 Оли? -------------------//
    //filterBrandGoods();
}


function countCategoryGoodsAll (value: string) {
    return goodsList.filter(item => item.category === value).length;
}


function countCategoryGoodsShow (value: string, obj: IGoodsList) {
    return obj.filter(item => item.category === value).length;
}


function countBrandGoodsAll (value: string) {
    return goodsList.filter(item => item.brand === value).length;
}


function countBrandGoodsShow (value: string, obj: IGoodsList) {
    return obj.filter(item => item.brand === value).length;
}


createCategoryFilters();
createBrandFilters();


export { createCategoryFilters }