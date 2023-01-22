'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const tabsParent = document.querySelector('.tabheader__items'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabs = tabsParent.querySelectorAll('.tabheader__item'),
          btnModal = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');

    //TABS START
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('active', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('active', 'fade');
        tabsContent[i].classList.remove('hide');

        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        event.preventDefault();
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
    //TABS END

    //TIMER START
    const deadlineFirst = new Date("2023-02-06");

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());

        if (t <= 0) {
            days = 0,
            hours = 0,
            minutes = 0,
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
        }

        return ({
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        });
    }

    function addZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        }
        else {
            return num;
        }
    }

    function setClock(selector, deadline) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);


        function updateClock() {
            const t = getTimeRemaining(deadline);

            days.innerHTML = addZero(t.days);
            hours.innerHTML = addZero(t.hours);
            minutes.innerHTML = addZero(t.minutes);
            seconds.innerHTML = addZero(t.seconds);

            if (t.total === 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', '2023-02-06:00:00');
    //TIMER END
    //MODAL START
    function openModal() {
        modal.classList.add('active', 'fade');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';

        clearInterval(modalStart);
    }

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('active', 'fade');
        document.body.style.overflow = '';
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    btnModal.forEach((item) => {
        item.addEventListener('click', () => openModal());
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    const modalStart = setTimeout(openModal, 60000);

    function showByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showByScroll);
        }
    }
    
    window.addEventListener('scroll', showByScroll);
    //MODAL END
    //CLASS START
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

    new MenuCard(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
        'menu__item'
    ).render();
    new MenuCard(
        'img/tabs/elite.jpg',
        'elite',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        15,
        '.menu .container',
        'menu__item'
    ).render();
    new MenuCard(
        'img/tabs/post.jpg',
        'post',
        'Меню "Постное""',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        12,
        '.menu .container'
    ).render();
    //CLASS END
    //start sending data
    const forms = document.querySelectorAll('form');

    const formsMassage = {
        load: 'img/form/spinner.svg',
        success: 'Спасибо! Мы скоро с вами свяжемся',
        fail: 'Ошибка!'
    };

    forms.forEach((item) => {
        sendData(item);
    });

    function sendData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const statusMassage = document.createElement('img');
            statusMassage.src = formsMassage.load;
            statusMassage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMassage);

            const formData = new FormData(form);

            const object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });

            fetch('server.php', {
                method: 'POST',
                body: JSON.stringify(object),
                headers: {
                    'Content-type': 'application/json'
                }
            }).then(data => data.text())
            .then(data => {
                console.log(data); 
                showThanksModal(formsMassage.success);
            })
            .catch(() => {
                showThanksModal(formsMassage.fail);
            })
            .finally(() => {
                statusMassage.remove();
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = modal.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');

        openModal();
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class = 'modal__content'>
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        modal.append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('active', 'fade');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 3000);
    }
    //end sending data
}); 