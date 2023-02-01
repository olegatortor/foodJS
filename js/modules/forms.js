import { postForm } from "../services/service";
import { openModal, closeModal } from "./modal";

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
        const modal = document.querySelector(modalSelector),

              prevModalDialog = modal.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');

        openModal('.modal', modalStart);
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
            closeModal('.modal');
        }, 3000);
    }
}

export default forms;