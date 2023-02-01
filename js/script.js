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
    slider();
    tabs();
    timer();
}); 