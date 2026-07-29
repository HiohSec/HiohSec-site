/* Main site JavaScript
   Kept in an external file (not inline <script>) to satisfy the CSP.
   Smooth scrolling for in-page anchors is handled in CSS via
   `scroll-behavior: smooth` + `scroll-padding-top` — no JS needed.
*/
(function () {
    // Mobile hamburger menu
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            menuBtn.classList.toggle('active', isOpen);
            menuBtn.setAttribute('aria-expanded', String(isOpen));
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Service cards: open modal with more details (services.html only)
    const modalOverlay = document.getElementById('service-modal');
    const modalTitle = document.getElementById('service-modal-title');
    const modalBody = document.getElementById('service-modal-body');
    const modalClose = modalOverlay ? modalOverlay.querySelector('.modal-close') : null;
    let lastFocusedCard = null; // restore focus here when the modal closes

    function openServiceModal(card) {
        const title = card.querySelector('h3');
        const shortDesc = card.querySelector('p');
        const list = card.querySelector('.service-list');
        // Build modal content by cloning DOM nodes — never innerHTML with
        // strings. Avoids any XSS sink even if card content becomes dynamic.
        modalTitle.textContent = title ? title.textContent : '';
        const fragment = document.createDocumentFragment();
        if (shortDesc) fragment.appendChild(shortDesc.cloneNode(true));
        if (list) fragment.appendChild(list.cloneNode(true));
        modalBody.replaceChildren(fragment);
        modalOverlay.classList.add('active');
        modalOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        lastFocusedCard = card;
        if (modalClose) modalClose.focus();
    }

    function closeServiceModal() {
        if (!modalOverlay.classList.contains('active')) return;
        modalOverlay.classList.remove('active');
        modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (lastFocusedCard) lastFocusedCard.focus();
    }

    if (modalOverlay) {
        document.querySelectorAll('.service-card').forEach(card => {
            // Make cards behave like buttons for mouse AND keyboard users
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.style.cursor = 'pointer';

            card.addEventListener('click', () => openServiceModal(card));
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openServiceModal(card);
                }
            });
        });

        if (modalClose) modalClose.addEventListener('click', closeServiceModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeServiceModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeServiceModal();
        });
    }
})();
