/* Main site JavaScript
   Moved from inline <script> blocks to satisfy CSP and enable execution.
*/
(function () {
    console.log('main.js loaded');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for in-page anchors (if target exists)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return; // ignore empty hashes
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Service cards: open modal with more details on click (defensive)
    const modalOverlay = document.getElementById('service-modal');
    const modalTitle = document.getElementById('service-modal-title');
    const modalBody = document.getElementById('service-modal-body');
    const modalClose = modalOverlay ? modalOverlay.querySelector('.modal-close') : null;

    function closeServiceModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove('active');
        modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (modalOverlay) {
        document.querySelectorAll('.service-card').forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                const title = card.querySelector('h3') ? card.querySelector('h3').textContent : '';
                const shortDesc = card.querySelector('p') ? card.querySelector('p').outerHTML : '';
                const listHtml = card.querySelector('.service-list') ? card.querySelector('.service-list').outerHTML : '';
                modalTitle.textContent = title;
                modalBody.innerHTML = shortDesc + listHtml;
                modalOverlay.classList.add('active');
                modalOverlay.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
                modalClose && modalClose.focus();
            });
        });

        modalClose && modalClose.addEventListener('click', closeServiceModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeServiceModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeServiceModal();
        });
    }
})();
