function modal() {
    const btnModal = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');

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
}

module.exports = modal;