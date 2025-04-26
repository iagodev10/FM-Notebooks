let slides = document.querySelectorAll('.slider-container .slider-box');
let botaoProximo = document.querySelector('#proxima');
let botaoAnterior = document.querySelector('#anterior');

let numeroDeSlides = slides.length;
let slideAtual = 0;
let intervaloTroca = 3000; // Tempo em milissegundos (3 segundos)
let intervaloAutoplay;

function mostrarSlide(indice) {
    slides.forEach(slide => slide.classList.remove('ativo'));
    slides[indice].classList.add('ativo');
}

function avancarSlide() {
    slideAtual++;
    if (slideAtual >= numeroDeSlides) {
        slideAtual = 0;
    }
    mostrarSlide(slideAtual);
}

function voltarSlide() {
    slideAtual--;
    if (slideAtual < 0) {
        slideAtual = numeroDeSlides - 1;
    }
    mostrarSlide(slideAtual);
}

function iniciarAutoplay() {
    intervaloAutoplay = setInterval(avancarSlide, intervaloTroca);
}

document.querySelector('.slider').addEventListener('mouseenter', () => {
    clearInterval(intervaloAutoplay);
});

document.querySelector('.slider').addEventListener('mouseleave', () => {
    iniciarAutoplay();
});

botaoProximo.addEventListener('click', () => {
    avancarSlide();
    clearInterval(intervaloAutoplay);
    iniciarAutoplay();
});

botaoAnterior.addEventListener('click', () => {
    voltarSlide();
    clearInterval(intervaloAutoplay);
    iniciarAutoplay();
});

mostrarSlide(slideAtual);
iniciarAutoplay();