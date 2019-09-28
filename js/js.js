"use strict";

class GoodsList {
    constructor() {
        this.items = [];
    }

    fetchItems() {
        this.items = [
    { title: 'Компьютерная мышь', price: 400, img: 'mouse.jpg' },
    { title: 'Жесткий диск SSD 480Gb', price: 10000, img: 'ssd.jpg' },
    { title: 'Материнская плата', price: 4000, img: 'motherboard.jpg' },
    { title: 'Видео-карта', price: 15000, img: 'video.jpg' },
]}

    render() {
        return this.items.map((item) => new Item(item.title, item.price, item.img)
            .render()).join('');
    }

    findPriceGoods(){
        let summ = null;
        this.items.forEach((item) => {
            summ += item.price
        });
        return summ;
    }

}

class Item {
    constructor(title, price, image) {
        this.price = price;
        this.title = title;
        this.img = image;
    }

    render() {
        return `<div class="catalog__item bxbb"> <img src="image/${this.img}" 
            alt="photo"><h3>${this.title}</h3><p>цена: ${this.price}р</p>
            <div class="button catalog_button">добавить</div></div>`
    }
}

const items = new GoodsList();
items.fetchItems();

let catalog = document.querySelector('.catalog');
catalog.insertAdjacentHTML('afterend', `<div class="output container">
    <p>Стоимость всех товаров ${items.findPriceGoods()}</p></div>`);


catalog.innerHTML = items.render();

