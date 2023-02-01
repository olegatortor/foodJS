function calc() {
    const result = document.querySelector('.calculating__result span');

    let sex = 'female',
        height, weight, age,
        ratio = 1.375;

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if (sex == 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round(88.36 + (13.4 * weight) + (4.8 * height) - (5.7* age) * ratio);
        }
    }
    calcTotal();

    function getStaticInformation(parent, active) {
        const list = document.querySelectorAll(`${parent} div`);

        list.forEach(element => {
            element.addEventListener('click', (e) => {
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

        input.addEventListener('input', (e) => {
            if (input.value.match(/[^\d.]/g)) {
                input.style.cssText = 'color:red; border: 1px solid red';
            } else {
                input.style.cssText = 'color:unset; border: unset';
            }

            switch(e.target.getAttribute('id')) {
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

export default calc;