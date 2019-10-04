"use strict";

function sendRequest(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status !== 200) {
                    reject();
                }
                const users = JSON.parse(xhr.responseText);

                resolve(users);
            }
        };
        xhr.send();
    });
}

class ItemsList  {
    constructor() {
        this.items = [];
    }

    fetchItems() {
        return sendRequest('/goods')
            .then((items) => {
                this.items = items;
            });
    }

    render() {
        return this.items.map((item) => new Item(item.title, item.price, item.img, item.id)
            .render()).join('');
    }
}

class Item {
    constructor(title, price, image, id) {
        this.price = price;
        this.title = title;
        this.img = image;
        this.id = id;
    }

    render() {
        return `<div data-art="${this.id}" class="catalog__item bxbb"> <img src="image/${this.img}" 
            alt="photo"><h3>${this.title}</h3><p>цена: ${this.price}р</p>
            <div class="button catalog_button">добавить</div></div>`
    }
}

const items = new ItemsList ();
const catalog = document.querySelector('.catalog');
items.fetchItems().then(() => {
    catalog.innerHTML = items.render();
    const test = document.getElementsByClassName('catalog_button');
    for (let i =0; i<test.length; i++){
        test[i].addEventListener('click', test2);
    }
});

class BasketList  {
    constructor() {
        this.basket = [];

        this._output = null
    }

    checkItems(art) {
        // проверяет есть ли в корзине этот товар
        for (let i = 0; i < this.basket.length; i++) {
            if (this.basket[i].id === art.id) {
                //если есть добавляет количество товара
                this.basket[i].quantity++;
                return this.render();
            }
        }
        //если нет добавляет обект в корзину
        this.addItem(art);
        console.log(basket);
        return this.render();
    }

    addItem(content){
        return this.basket.push(content);
    }

    render() {
        return this.basket.map((item) => new ItemBasket(item.title, item.price, item.img, item.id, item.quantity)
            .render()).join('');
    }

    outResult() {
        if (!this._output) {
            this._output = document.createElement("div");
            this._output.className = 'output container';
            this._output.innerHTML = `<p>Стоимость всех товаров ${basket.findPriceGoods()}</p>`;
            console.log(this._output);
            return this._output;
            // catalog.insertAdjacentHTML('afterend', `${this._output}`);
        } else {
            document.querySelector('.output').innerHTML = `<p>Стоимость всех товаров ${basket.findPriceGoods()}</p>`;
        }
    }

    findPriceGoods(){
        let summ = null;
        this.basket.forEach((item) => {
            summ += item.price * item.quantity
        });
        return summ;
    }
}

class ItemBasket extends  Item{
    constructor(title, price, image, id, quantity){
        super(title, price, image, id,);
        this.quantity = quantity;
    }
    render() {
        return `<div data-art="${this.id}" class="basket__item bxbb"> <img src="image/${this.img}" 
            alt="photo"><h3>${this.title}</h3><p>цена: ${this.price}р</p>
            <div class="button basket_button">+</div><div class="quantity_out">${this.quantity}</div><div class="button basket_button">-</div></div>` ;

    }
}
const basket = new BasketList();

const basketOut = document.querySelector('#basket');
function test2(){
    for (const key of items.items) {
        if (+this.parentNode.dataset.art === key.id) {
            basketOut.innerHTML = basket.checkItems(key);
            basket.outResult();
            basketOut.after(basket._output);
            console.log(basket._output)
        }
    }
}
