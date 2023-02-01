'use strict';
import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import { openModal } from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {    
    const modalStart = setTimeout(() => openModal('.modal', modalStart), 5000);
    
    calc();
    cards(); 
    forms('.modal', modalStart); 
    modal('[data-modal]', '.modal', modalStart); 
    slider({
        nextArrow: '[data-next]',
        prevArrow: '[data-prev]',
        container: '.offer__slide',
        slide: '.offer__slider',
        currentCounter: '#current',
        totalCounter: '#total',
        wrapper: '.offer__slider-wrapper',
        inner: '.offer__slider-inner'
    });
    tabs('.tabheader__items', '.tabcontent', '.tabheader__item', 'tabheader__item_active');
    timer('.timer', "2023-02-06:00:00");
}); 