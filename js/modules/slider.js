function slider({nextArrow, prevArrow, container, slide, currentCounter, totalCounter, wrapper, inner}) {
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
    const numWithStr = (str) => +str.replace(/\D/g, '');

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
        if (offset == numWithStr(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += numWithStr(width);
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

export default slider;