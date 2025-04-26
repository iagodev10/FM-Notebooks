document.addEventListener('DOMContentLoaded', function() {
    const menuMobile = document.querySelector('.menu-mobile');
    const navMenu = document.querySelector('.nav-menu');

    menuMobile.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Fechar o menu quando clicar em um link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
}); 