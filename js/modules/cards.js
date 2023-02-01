import { getResource } from "../services/service";

function cards() {
    class MenuCard {
        constructor(img, alt, name, descr, price, parentSelector, ...classes) {
            this.img = img;
            this.alt = alt;
            this.name = name;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 38;
            this.changeToUAH();
        }
        changeToUAH() {
            this.price = this.transfer * this.price;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                element.classList.add('menu__item');
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src="${this.img}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.name}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
}

export default cards;