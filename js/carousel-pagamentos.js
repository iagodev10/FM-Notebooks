// Carousel de cartões de pagamento (mobile)
// Só ativa em telas pequenas e quando a estrutura existe
(function initPagamentoCarousel() {
  const content = document.querySelector('.pagamento-card-content');
  const items = document.querySelectorAll('.pague-item');

  if (!content || items.length === 0) return;

  // Evita conflito com CSS de layout em desktop: ativa só em mobile
  const isMobile = () => window.innerWidth <= 768;
  let index = 0;
  let intervalId = null;

  function applyTransform() {
    content.style.transform = `translateX(-${index * 100}%)`;
    content.style.transition = 'transform 0.4s ease';
  }

  function start() {
    if (!isMobile() || intervalId) return;
    intervalId = setInterval(() => {
      index = (index + 1) % items.length;
      applyTransform();
    }, 3000);
  }

  function stop() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
      content.style.transform = '';
      content.style.transition = '';
    }
  }

  // Inicializa conforme o tamanho da tela
  function handleResize() {
    if (isMobile()) {
      start();
    } else {
      stop();
    }
  }

  window.addEventListener('resize', handleResize);
  handleResize();
})();
