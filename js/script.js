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

    btns.forEach((btn) => {
        btn.addEventListener('click', () => {
            modal.classList.add('active', 'fade');
            modal.classList.remove('hide', 'close');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        modal.classList.add('hide', 'close');
        modal.classList.remove('active', 'fade');
        document.body.style.overflow = '';
    }

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
    //MODAL END
});