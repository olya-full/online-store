import { goodsList, IGoodsList } from './goods-list';


function createCategoryFilters () {
    const categoryItems: Array<string> = [];
    const filtersCategory = document.querySelector('.filters__category');

    for (let i=0; i < goodsList.length; i++) {
        if (!(categoryItems.includes(goodsList[i].category))) {
            categoryItems.push(goodsList[i].category)
        }
    }

    const divCheckselect = document.createElement('div') as HTMLDivElement;
    divCheckselect.classList.add('checkselect');
    divCheckselect.classList.add('filters__category__items');

    for (let i=0; i < categoryItems.length; i++) {
        const label = document.createElement('label') as HTMLLabelElement;

        const input = document.createElement('input') as HTMLInputElement;
        input.type = 'checkbox';
        input.name = categoryItems[i];
        input.value = categoryItems[i];

        const div = document.createElement('div') as HTMLDivElement;
        div.classList.add('checkselect__items');
        div.textContent = categoryItems[i];

        const divCount = document.createElement('div') as HTMLDivElement;
        divCount.classList.add('checkselect__count');
        
        const divStock = document.createElement('div') as HTMLDivElement;
        divStock.classList.add('checkselect__count__stok');

        const divSeparator = document.createElement('div') as HTMLDivElement;
        divSeparator.textContent = '/';

        const divShow = document.createElement('div') as HTMLDivElement;
        divShow.classList.add('checkselect__count__show');

        label.appendChild(input);
        label.appendChild(div);
        label.appendChild(divCount);
        divCount.appendChild(divShow);
        divCount.appendChild(divSeparator);
        divCount.appendChild(divStock);
        divCheckselect.appendChild(label);
    }

    filtersCategory?.appendChild(divCheckselect);
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

        const input = document.createElement('input') as HTMLInputElement;
        input.type = 'checkbox';
        input.name = brandItems[i];
        input.value = brandItems[i];

        const div = document.createElement('div') as HTMLDivElement;
        div.classList.add('checkselect__items');
        div.textContent = brandItems[i];

        const divCount = document.createElement('div') as HTMLDivElement;
        divCount.classList.add('checkselect__count');
        
        const divStock = document.createElement('div') as HTMLDivElement;
        divStock.classList.add('checkselect__count__stok');

        const divSeparator = document.createElement('div') as HTMLDivElement;
        divSeparator.textContent = '/';

        const divShow = document.createElement('div') as HTMLDivElement;
        divShow.classList.add('checkselect__count__show');

        label.appendChild(input);
        label.appendChild(div);
        label.appendChild(divCount);
        divCount.appendChild(divShow);
        divCount.appendChild(divSeparator);
        divCount.appendChild(divStock);
        divCheckselect.appendChild(label);
    }

    filtersBrand?.appendChild(divCheckselect);
}


createCategoryFilters();
createBrandFilters();