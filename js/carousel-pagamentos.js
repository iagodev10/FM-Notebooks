document.addEventListener("DOMContentLoaded", () => {
  let currentIndex = 0
  let carouselInterval

  function initPaymentCarousel() {
    const container = document.querySelector(".pagamento-card-content")
    const items = document.querySelectorAll(".pague-item")
    const total = items.length

    if (!container || total === 0) return

    // Sempre começa do primeiro
    currentIndex = 0
    container.style.transform = "translateX(0)"

    if (carouselInterval) clearInterval(carouselInterval)

    if (window.innerWidth <= 768) {
      // Mobile -> 1 card por vez
      carouselInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % total
        container.style.transform = `translateX(-${currentIndex * 100}%)`
      }, 3000)
    } else if (window.innerWidth <= 1024) {
      // Tablet -> 2 cards por vez
      const maxIndex = Math.ceil(total / 2) - 1
      carouselInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % (maxIndex + 1)
        container.style.transform = `translateX(-${currentIndex * 100}%)`
      }, 3000)
    }
  }

  initPaymentCarousel()
  window.addEventListener("resize", initPaymentCarousel)
})
