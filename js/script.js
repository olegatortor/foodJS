'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const tabsParent = document.querySelector('.tabheader__items'),
          tabs = tabsParent.querySelectorAll('.tabheader__item'),
          tabContent = document.querySelectorAll('.tabcontent');
    //TABS START
    function hideTabContent() {
        tabContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('active', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabContent[i].classList.add('active', 'fade');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (item == target) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
    //TABS END
    //TIMER START
    const deadline = '2022-09-15';
    
    function leftTime(date) {
        let days,hours, minutes, seconds;
        const time = Date.parse(date) - Date.parse(new Date());
        if (time <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(time / (1000 * 60 * 60 * 24)),
            hours = Math.floor((time / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((time / (1000 * 60)) % 60),
            seconds = Math.floor((time / 1000) % 60);
        }
              
        return {
            'total': time,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function addZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function getTime(selector, end) {
        const timer = document.querySelector(selector),
              day = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
        
        updateClock();

        function updateClock() {
            const arrTime = leftTime(end);

            day.textContent = addZero(arrTime.days);
            hours.textContent = addZero(arrTime.hours);
            minutes.textContent = addZero(arrTime.minutes);
            seconds.textContent = addZero(arrTime.seconds);

            if (arrTime.total === 0) {
                clearInterval(timeInterval);
            }
        }
    }

    getTime('.timer', deadline);
    //TIMER END
    //MODAL START
    const btns = document.querySelectorAll('[data-modal]'),
          modalClose = document.querySelector('[data-close]'),
          modal = document.querySelector('.modal');

    function openModal() {
        modal.classList.add('active', 'fade');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalOpen);
    };
    
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    btns.forEach((btn) => {
        btn.addEventListener('click', () => {
            openModal();
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    modalClose.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('active')) {
            closeModal(modal);
        }
    });

    
    // const modalOpen = setTimeout(openModal, 10000);

    function showByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showByScroll);
        }
    }
    window.addEventListener('scroll', showByScroll);
    //MODAL END
    //CLASS START
    const parentCardMenu = document.querySelector('.menu__field .container');
    class CreateCardMenu {
        constructor(img, title, descr, price) {
            this.img = img;
            this.title = title;
            this.descr = descr;
            this.price = price;
        }

        render() {
            const item = document.createElement('div');
            item.innerHTML = `
                <div class="menu__item">
                    <img src="img/tabs/${this.img}.jpg" alt="${this.img}">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
            `;
            parentCardMenu.append(item);
        }
    }
    new CreateCardMenu('vegy','Меню "Фитнес"','Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!','229').render();
    new CreateCardMenu('elite','Меню “Премиум”','В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!','550').render();
    new CreateCardMenu('post','Меню "Постное"','Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.','430').render();
    //CLASS END
});