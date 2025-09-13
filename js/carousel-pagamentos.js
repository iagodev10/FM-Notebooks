const carrosselContent = document.querySelector(".carrossel-content");
const cards = document.querySelectorAll(".pague-item");

let index = 0;
const tempo = 3000; // tempo em ms (3 segundos)

function updateCarrossel() {
  carrosselContent.style.transform = `translateX(${-index * 100}%)`;
}

function autoSlide() {
  index++;
  if (index >= cards.length) {
    index = 0; // volta para o primeiro
  }
  updateCarrossel();
}

setInterval(autoSlide, tempo);
