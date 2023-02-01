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

    

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    btnModal.forEach((item) => {
        item.addEventListener('click', () => openModal(modalSelector, modalStart));
    });

    document.addEventListener('keydown', (e) => {
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

export default modal;
export {openModal, closeModal};