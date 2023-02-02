/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
  const result = document.querySelector('.calculating__result span');
  let sex = 'female',
    height,
    weight,
    age,
    ratio = 1.375;
  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = '____';
      return;
    }
    if (sex == 'female') {
      result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
    } else {
      result.textContent = Math.round(88.36 + 13.4 * weight + 4.8 * height - 5.7 * age * ratio);
    }
  }
  calcTotal();
  function getStaticInformation(parent, active) {
    const list = document.querySelectorAll(`${parent} div`);
    list.forEach(element => {
      element.addEventListener('click', e => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
        } else {
          sex = e.target.getAttribute('id');
        }
        list.forEach(el => {
          el.classList.remove(active);
        });
        element.classList.add(active);
        calcTotal();
      });
    });
  }
  getStaticInformation('#gender', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');
  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);
    input.addEventListener('input', e => {
      if (input.value.match(/[^\d.]/g)) {
        input.style.cssText = 'color:red; border: 1px solid red';
      } else {
        input.style.cssText = 'color:unset; border: unset';
      }
      switch (e.target.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      }
      calcTotal();
    });
  }
  localStorage.setItem('g', 3);
  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/service */ "./js/services/service.js");

function cards() {
  class MenuCard {
    constructor(img, alt, name, descr, price, parentSelector) {
      this.img = img;
      this.alt = alt;
      this.name = name;
      this.descr = descr;
      this.price = price;
      for (var _len = arguments.length, classes = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
        classes[_key - 6] = arguments[_key];
      }
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
  (0,_services_service__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu').then(data => {
    data.forEach(_ref => {
      let {
        img,
        altimg,
        title,
        descr,
        price
      } = _ref;
      new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    });
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/service */ "./js/services/service.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");


function forms(modalSelector, modalStart) {
  const forms = document.querySelectorAll('form');
  const formsMassage = {
    load: 'img/form/spinner.svg',
    success: 'Спасибо! Мы скоро с вами свяжемся',
    fail: 'Ошибка!'
  };
  forms.forEach(form => {
    bindPostForm(form);
  });
  function bindPostForm(form) {
    form.addEventListener('submit', e => {
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
      (0,_services_service__WEBPACK_IMPORTED_MODULE_0__.postForm)('http://localhost:3000/requests', object).then(data => {
        console.log(data);
        showThanksModal(formsMassage.success);
      }).catch(() => {
        showThanksModal(formsMassage.fail);
      }).finally(() => {
        form.reset();
        statusMessage.remove();
      });
    });
  }
  function showThanksModal(message) {
    const modal = document.querySelector(modalSelector),
      prevModalDialog = modal.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    (0,_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalStart);
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
      (0,_modal__WEBPACK_IMPORTED_MODULE_1__.closeModal)('.modal');
    }, 3000);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalStart) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('active', 'fade');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';
  if (modalStart) {
    clearInterval(modalStart);
  }
}
function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('hide');
  modal.classList.remove('active', 'fade');
  document.body.style.overflow = '';
}
function modal(modalBtn, modalSelector, modalStart) {
  const btnModal = document.querySelectorAll(modalBtn),
    modal = document.querySelector(modalSelector);
  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
    }
  });
  btnModal.forEach(item => {
    item.addEventListener('click', () => openModal(modalSelector, modalStart));
  });
  document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && modal.classList.contains('active')) {
      closeModal(modalSelector);
    }
  });
  function showByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 1) {
      openModal(modalSelector, modalStart);
      window.removeEventListener('scroll', showByScroll);
    }
  }
  window.addEventListener('scroll', showByScroll);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider(_ref) {
  let {
    nextArrow,
    prevArrow,
    container,
    slide,
    currentCounter,
    totalCounter,
    wrapper,
    inner
  } = _ref;
  const nextSlide = document.querySelector(nextArrow),
    prevSlide = document.querySelector(prevArrow),
    slides = document.querySelectorAll(container),
    slider = document.querySelector(slide),
    current = document.querySelector(currentCounter),
    total = document.querySelector(totalCounter),
    sliderWrapper = document.querySelector(wrapper),
    sliderInner = document.querySelector(inner),
    width = window.getComputedStyle(sliderWrapper).width;
  let indexSlide = 0;
  let offset = 0;
  let dotsArr = [];
  const numWithStr = str => +str.replace(/\D/g, '');
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
      indexSlide + 1 < 10 ? current.textContent = `0${indexSlide + 1}` : current.textContent = indexSlide + 1;
    }
    dotsArr.forEach(el => el.style.opacity = '0.5');
    dotsArr[indexSlide].style.opacity = 1;
  }
  nextSlide.addEventListener('click', () => {
    if (offset == numWithStr(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += numWithStr(width);
    }
    sliderInner.style.transform = `translateX(-${offset}px)`;
    if (indexSlide + 1 >= slides.length) {
      indexSlide = 0;
    } else {
      indexSlide++;
    }
    changeIndex();
    dotsArr[indexSlide].style.opacity = 1;
  });
  prevSlide.addEventListener('click', () => {
    if (offset == 0) {
      offset = numWithStr(width) * (slides.length - 1);
    } else {
      offset -= numWithStr(width);
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
      offset = dotsArr.indexOf(el) * numWithStr(width);
      sliderInner.style.transform = `translateX(-${offset}px)`;
      indexSlide = dotsArr.indexOf(el);
      changeIndex();
    });
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(parentSelector, contentSelector, tabsSelector, activeSelector) {
  const tabsParent = document.querySelector(parentSelector),
    tabsContent = document.querySelectorAll(contentSelector),
    tabs = tabsParent.querySelectorAll(tabsSelector);
  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('active', 'fade');
    });
    tabs.forEach(item => {
      item.classList.remove(activeSelector);
    });
  }
  function showTabContent() {
    let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabsContent[i].classList.add('active', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add(activeSelector);
  }
  hideTabContent();
  showTabContent();
  tabsParent.addEventListener('click', event => {
    event.preventDefault();
    const target = event.target;
    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(timerSelector, deadline) {
  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());
    if (t <= 0) {
      days = 0, hours = 0, minutes = 0, seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24)), hours = Math.floor(t / (1000 * 60 * 60) % 24), minutes = Math.floor(t / 1000 / 60 % 60), seconds = Math.floor(t / 1000 % 60);
    }
    return {
      'total': t,
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
  setClock(timerSelector, deadline);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/service.js":
/*!********************************!*\
  !*** ./js/services/service.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postForm": () => (/* binding */ postForm)
/* harmony export */ });
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
const getResource = async url => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`${url}: ${res.status}`);
  }
  return await res.json();
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");










window.addEventListener('DOMContentLoaded', () => {
  const modalStart = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)('.modal', modalStart), 5000);
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])('.modal', modalStart);
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]', '.modal', modalStart);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
    nextArrow: '[data-next]',
    prevArrow: '[data-prev]',
    container: '.offer__slide',
    slide: '.offer__slider',
    currentCounter: '#current',
    totalCounter: '#total',
    wrapper: '.offer__slider-wrapper',
    inner: '.offer__slider-inner'
  });
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])('.tabheader__items', '.tabcontent', '.tabheader__item', 'tabheader__item_active');
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', "2023-02-06:00:00");
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map