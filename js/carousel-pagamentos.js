document.addEventListener("DOMContentLoaded", () => {
  let currentIndex = 0
  let carouselInterval

  function initPaymentCarousel() {
    const container = document.querySelector(".pagamento-card-content")
    const items = document.querySelectorAll(".pague-item")
    const total = items.length

    if (!container || total === 0) return

    // Limpa interval anterior se existir
    if (carouselInterval) {
      clearInterval(carouselInterval)
    }

    // Só inicia o carrossel no mobile
    if (window.innerWidth <= 768) {
      carouselInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % total
        container.style.transform = `translateX(-${currentIndex * 100}%)`
      }, 3000) // Muda a cada 3 segundos
    } else {
      // Remove transformação no desktop
      container.style.transform = "translateX(0)"
      currentIndex = 0
    }
  }

  // Inicializa o carrossel
  initPaymentCarousel()

  // Reinicializa quando a tela é redimensionada
  window.addEventListener("resize", initPaymentCarousel)

  // Pausa o carrossel quando o mouse está sobre ele (apenas mobile)
  const paymentSection = document.querySelector(".pagamento-card")
  if (paymentSection) {
    paymentSection.addEventListener("mouseenter", () => {
      if (window.innerWidth <= 768 && carouselInterval) {
        clearInterval(carouselInterval)
      }
    })

    paymentSection.addEventListener("mouseleave", () => {
      if (window.innerWidth <= 768) {
        initPaymentCarousel()
      }
    })
  }
})
