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

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`${url}: ${res.status}`);
        }
    
        return await res.json();
    };

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    const forms = document.querySelectorAll('form');

    const formsMassage = {
        load: 'img/form/spinner.svg',
        success: 'Спасибо! Мы скоро с вами свяжемся',
        fail: 'Ошибка!'
    };

    forms.forEach(form => {
        bindPostForm(form);
    });

    const postForm = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return await res.json();
    };

    function bindPostForm(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = formsMassage.load;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const object = Object.fromEntries(formData.entries());

            postForm('http://localhost:3000/requests', object)
            .then(data => {
                console.log(data);
                showThanksModal(formsMassage.success);
            })
            .catch(() => {
                showThanksModal(formsMassage.fail);
            })
            .finally(() => {
                form.reset();
                statusMessage.remove();
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
    //SLIDER START
    const nextSlide = document.querySelector('[data-next]'),
          prevSlide = document.querySelector('[data-prev]'),
          slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
          current = document.querySelector('#current'),
          total = document.querySelector('#total'),
          sliderWrapper = document.querySelector('.offer__slider-wrapper'),
          sliderInner = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(sliderWrapper).width;

    let indexSlide = 0;
    let offset = 0;
    let dotsArr = [];
    const numWidth = +width.slice(0, width.length - 2);

    sliderWrapper.style.cssText = `overflow: hidden`;
    sliderInner.style.cssText = `display: flex; width: ${100 * slides.length}%; transition: all .5s`;

    current.textContent = `0${indexSlide + 1}`;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = `${slides.length}`;
    }
    function changeIndex() {
        if (slides.length < 10) {
            current.textContent = `0${indexSlide + 1}`;
        } else {
            indexSlide+1 < 10 ? current.textContent = `0${indexSlide + 1}`: current.textContent = indexSlide + 1;
        }

        dotsArr.forEach(el => el.style.opacity = '0.5');
        dotsArr[indexSlide].style.opacity = 1;
    }

    nextSlide.addEventListener('click', () => {
        if (offset == numWidth * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += numWidth;
        }

        sliderInner.style.transform = `translateX(-${offset}px)`;

        if (indexSlide+1 >= slides.length) {
            indexSlide = 0;
        } else {
            indexSlide++;
        }
        changeIndex();
        dotsArr[indexSlide].style.opacity = 1;
    });

    prevSlide.addEventListener('click', () => {
        if (offset == 0) {
            offset = numWidth * (slides.length - 1);
        } else {
            offset -= numWidth;
        }
        
        sliderInner.style.transform = `translateX(-${offset}px)`;

        if (indexSlide == 0) {
            indexSlide = slides.length - 1;
        } else {
            indexSlide--;
        }
        changeIndex();
        dotsArr[indexSlide].style.opacity = 1;
    });

    slider.style.position = 'relative';

    let dots = document.createElement('div');
    dots.classList.add('carousel-indicators');
    dots.style.cssText = 'position: absolute; right: 0; bottom: 0; left: 0; z-index: 15; display: flex; justify-content: center; margin-right: 15%; margin-left: 15%; list-style: none;';
    slider.append(dots);

    for (let i = 0; i <= slides.length - 1; i++) {
        let dot = document.createElement('div');
        dot.classList.add('dot');
        dot.style.cssText = 'box-sizing: content-box; flex: 0 1 auto; width: 30px; height: 6px; margin-right: 3px; margin-left: 3px; cursor: pointer; background-color: #fff; background-clip: padding-box; border-top: 10px solid transparent; border-bottom: 10px solid transparent; opacity: .5; transition: opacity .6s ease;';
        if (i == 0) {
            dot.style.opacity = 1;
        }
        dots.append(dot);
        dotsArr.push(dot);
    }

    dotsArr.forEach(el => {
        el.addEventListener('click', () => {
            offset = dotsArr.indexOf(el) * numWidth;
            sliderInner.style.transform = `translateX(-${offset}px)`;
            indexSlide = dotsArr.indexOf(el);   
            changeIndex();
        });
    });
    // function showSlide(n) {
    //     slides.forEach(slide => {
    //         slide.classList.remove('active');
    //         slide.classList.add('hide');
    //     });

    //     if (n >= slides.length) {
    //         indexSlide = 0;
    //     } else if (n < 0) {
    //         indexSlide = slides.length - 1;
    //     }

    //     if (slides.length < 10) {
    //         current.textContent = `0${indexSlide+1}`;
    //     } else {
    //         if (indexSlide+1 < 10) {
    //             current.textContent = `0${indexSlide+1}`;
    //         } else {
    //             current.textContent = indexSlide+1;
    //         }
    //     }
        
    //     slides[indexSlide].classList.remove('hide');
    //     slides[indexSlide].classList.add('active', 'fade');
    // }
    // showSlide(indexSlide);

    // function plusSlide(n) {
    //     showSlide(indexSlide += n);
    // }

    // nextSlide.addEventListener('click', () => {
    //     plusSlide(1);
    // });
    // prevSlide.addEventListener('click', () => {
    //     plusSlide(-1);
    // });
    
    //SLIDER END
}); 