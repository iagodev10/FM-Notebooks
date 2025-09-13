class MobileNavbar {
    constructor(mobileMenu, navList, navLinks, activeClass) {
        this.mobileMenu = document.querySelector(mobileMenu);
        this.navList = document.querySelector(navList);
        this.navLinks = document.querySelectorAll(navLinks);
        this.activeClass = activeClass;
        this.overlay = document.querySelector('.overlay');
        this.isOpen = false;

        this.handleClick = this.handleClick.bind(this);
    }

    animateLinks() {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.navLinks.forEach((link, index) => {
            link.style.animation
                ? (link.style.animation = "")
                : (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`);
        });
    }

    handleClick() {
        this.navList.classList.toggle(this.activeClass);
        this.mobileMenu.classList.toggle(this.activeClass);
        this.animateLinks();

        // Gerenciar foco
        if (isOpen) {
            this.restoreFocusElement = document.activeElement;
            const firstLink = this.navList.querySelector('a, button');
            if (firstLink) {
                firstLink.focus({ preventScroll: true });
            }
            document.addEventListener('keydown', this.handleKeydown);
            document.addEventListener('click', this.handleOutsideClick);
            document.addEventListener('focus', this.trapFocus, true);
        } else {
            document.removeEventListener('keydown', this.handleKeydown);
            document.removeEventListener('click', this.handleOutsideClick);
            document.removeEventListener('focus', this.trapFocus, true);
            if (this.restoreFocusElement && this.restoreFocusElement.focus) {
                this.restoreFocusElement.focus({ preventScroll: true });
            }
        }
    }

    closeMenu() {
        this.navList.classList.remove(this.activeClass);
        this.mobileMenu.classList.remove(this.activeClass);
        this.mobileMenu.setAttribute('aria-expanded', 'false');
        if (this.overlay) {
            this.overlay.classList.remove(this.activeClass);
        }
        document.body.style.overflow = '';
        this.isOpen = false;
    }

    handleClick() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    handleOverlayClick() {
        this.closeMenu();
    }

    handleEscape(e) {
        if (e.key === 'Escape' && this.isOpen) {
            this.closeMenu();
        }
    }

    addClickEvent() {
        this.mobileMenu.addEventListener("click", this.handleClick);
        
        // Fechar menu ao clicar nos links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });

        // Fechar menu ao clicar no overlay
        if (this.overlay) {
            this.overlay.addEventListener('click', this.handleOverlayClick);
        }

        // Fechar menu com ESC
        document.addEventListener('keydown', this.handleEscape);
    }

    handleKeydown(event) {
        const isOpen = this.navList.classList.contains(this.activeClass);
        if (!isOpen) return;

        // Fechar com ESC
        if (event.key === 'Escape') {
            this.handleClick();
            return;
        }
    }

    handleOutsideClick(event) {
        const isOpen = this.navList.classList.contains(this.activeClass);
        if (!isOpen) return;
        const clickInsideMenu = this.navList.contains(event.target) || this.mobileMenu.contains(event.target);
        if (!clickInsideMenu) {
            this.handleClick();
        }
    }

    trapFocus(event) {
        const isOpen = this.navList.classList.contains(this.activeClass);
        if (!isOpen) return;
        const focusable = this.navList.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        // Se foco saiu do menu, puxar de volta
        if (!this.navList.contains(event.target)) {
            first.focus({ preventScroll: true });
        }

        // Laço com Tab/Shift+Tab
        if (event.type === 'keydown' && event.key === 'Tab') {
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    }

    init() {
        if (this.mobileMenu) {
            this.addClickEvent();
        }
        return this;
    }
}

const mobileNavbar = new MobileNavbar(
    ".mobile-menu",
    ".nav-list",
    ".nav-list li",
    "active"
);

mobileNavbar.init();


$('#carousel').owlCarousel({
    loop: true,
    margin: -1,
    items: 1,
    nav: true,
    navText: ['<i class="ion-ios-arrow-back"></i>', '<i class="ion-ios-arrow-forward"></i>'],
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true
  });
  
  $('.intro-carousel').on('translate.owl.carousel', function () {
    $('.intro-content .intro-title').removeClass('zoomIn animated').hide();
    $('.intro-content .intro-price').removeClass('fadeInUp animated').hide();
  });
  
  $('.intro-carousel').on('translated.owl.carousel', function () {
    $('.intro-content .intro-title').addClass('zoomIn animated').show();
    $('.intro-content .intro-price').addClass('fadeInUp animated').show();
  });
  

