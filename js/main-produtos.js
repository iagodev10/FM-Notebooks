class ProfessionalNavigation {
  constructor() {
    this.mobileMenu = document.querySelector(".mobile-menu")
    this.mobileNavOverlay = document.querySelector(".mobile-nav-overlay")
    this.mobileNav = document.querySelector(".mobile-nav")
    this.navLinks = document.querySelectorAll(".mobile-nav a")
    this.overlay = document.querySelector(".overlay")
    this.filterToggle = document.querySelector("#toggle-filtro")
    this.filterPanel = document.querySelector(".filtro-fi")
    this.filterClose = document.querySelector(".close-filtro")
    this.searchInputs = document.querySelectorAll("#input-busca, #input-busca-mobile")
    this.searchButtons = document.querySelectorAll(".search-btn")
    this.cartLinks = document.querySelectorAll(".cart-link")

    this.isMenuOpen = false
    this.isFilterOpen = false

    this.init()
  }

  init() {
    this.setupMobileMenu()
    this.setupSearch()
    this.setupCart()
    this.setupMobileFilter()
    this.setupKeyboardNavigation()
    this.setupResponsiveAdjustments()
    this.updateCartDisplay()
  }

  setupMobileMenu() {
    if (this.mobileMenu && this.mobileNavOverlay && this.mobileNav) {
      this.mobileMenu.addEventListener("click", (e) => {
        e.preventDefault()
        this.toggleMobileMenu()
      })

      // Close menu when clicking overlay
      this.mobileNavOverlay.addEventListener("click", () => {
        this.closeMobileMenu()
      })

      // Close menu when clicking nav links
      this.navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          this.closeMobileMenu()
        })
      })
    }
  }

  toggleMobileMenu() {
    if (this.isMenuOpen) {
      this.closeMobileMenu()
    } else {
      this.openMobileMenu()
    }
  }

  openMobileMenu() {
    this.isMenuOpen = true
    this.mobileMenu.classList.add("active")
    this.mobileNavOverlay.classList.add("active")
    this.mobileNav.classList.add("active")

    this.mobileMenu.setAttribute("aria-expanded", "true")
    document.body.style.overflow = "hidden"

    this.animateNavLinks()
  }

  closeMobileMenu() {
    this.isMenuOpen = false
    this.mobileMenu.classList.remove("active")
    this.mobileNavOverlay.classList.remove("active")
    this.mobileNav.classList.remove("active")

    this.mobileMenu.setAttribute("aria-expanded", "false")
    document.body.style.overflow = ""
  }

  animateNavLinks() {
    this.navLinks.forEach((link, index) => {
      link.style.animation = "none"
      link.offsetHeight // Trigger reflow
      link.style.animation = `slideInRight 0.4s ease forwards`
      link.style.animationDelay = `${(index + 1) * 0.1}s`
    })
  }

  setupSearch() {
    this.searchInputs.forEach((input) => {
      if (input) {
        // Real-time search
        input.addEventListener("input", (e) => {
          this.performSearch(e.target.value)
        })

        // Search on Enter
        input.addEventListener("keypress", (e) => {
          if (e.key === "Enter") {
            e.preventDefault()
            this.performSearch(e.target.value)
          }
        })

        // Sync search inputs
        input.addEventListener("input", (e) => {
          this.syncSearchInputs(e.target.value, e.target)
        })
      }
    })

    // Search button clicks
    this.searchButtons.forEach((button) => {
      if (button) {
        button.addEventListener("click", (e) => {
          e.preventDefault()
          const input = button.parentElement.querySelector("input")
          if (input) {
            this.performSearch(input.value)
          }
        })
      }
    })
  }

  syncSearchInputs(value, currentInput) {
    this.searchInputs.forEach((input) => {
      if (input !== currentInput) {
        input.value = value
      }
    })
  }

  performSearch(query) {
    console.log("Buscando por:", query)
    // Search functionality handled by filtro.js
    if (query.trim()) {
      // Add visual feedback
      this.searchButtons.forEach((button) => {
        button.style.transform = "translateY(-50%) scale(0.95)"
        setTimeout(() => {
          button.style.transform = "translateY(-50%) scale(1)"
        }, 150)
      })
    }
  }

  setupCart() {
    this.cartLinks.forEach((link) => {
      if (link) {
        link.addEventListener("click", (e) => {
          e.preventDefault()
          this.handleCartClick()
        })
      }
    })
  }

  handleCartClick() {
    this.cartLinks.forEach((link) => {
      link.style.transform = "scale(0.95)"
      setTimeout(() => {
        link.style.transform = "scale(1)"
      }, 150)
    })

    console.log("Carrinho clicado")
    // Add cart functionality here
  }

  updateCartDisplay() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]")
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0)

    const cartCounts = document.querySelectorAll(".cart-count")
    cartCounts.forEach((count) => {
      count.textContent = totalItens
      count.style.display = totalItens > 0 ? "flex" : "none"
    })
  }

  setupMobileFilter() {
    if (this.filterToggle && this.filterPanel) {
      this.filterToggle.addEventListener("click", () => {
        this.toggleFilter()
      })

      if (this.filterClose) {
        this.filterClose.addEventListener("click", () => {
          this.closeFilter()
        })
      }
    }
  }

  toggleFilter() {
    if (this.isFilterOpen) {
      this.closeFilter()
    } else {
      this.openFilter()
    }
  }

  openFilter() {
    this.isFilterOpen = true
    this.filterPanel.classList.add("active")
    if (this.overlay) {
      this.overlay.classList.add("active")
    }
    document.body.style.overflow = "hidden"

    if (this.filterToggle) {
      this.filterToggle.innerHTML = '<i class="fas fa-filter"></i> Ocultar Filtros'
    }
  }

  closeFilter() {
    this.isFilterOpen = false
    this.filterPanel.classList.remove("active")
    if (this.overlay) {
      this.overlay.classList.remove("active")
    }
    document.body.style.overflow = ""

    if (this.filterToggle) {
      this.filterToggle.innerHTML = '<i class="fas fa-filter"></i> Mostrar Filtros'
    }
  }

  setupKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "Escape":
          this.closeMobileMenu()
          this.closeFilter()
          break
        case "/":
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            const firstSearchInput =
              document.querySelector("#input-busca") || document.querySelector("#input-busca-mobile")
            if (firstSearchInput) {
              firstSearchInput.focus()
            }
          }
          break
      }
    })
  }

  setupResponsiveAdjustments() {
    this.updateBodyPadding()

    const resizeHandler = () => {
      this.updateBodyPadding()
      this.handleResize()
    }

    window.addEventListener("resize", resizeHandler)

    // Listen for cart updates
    window.addEventListener("storage", () => {
      this.updateCartDisplay()
    })

    // Custom event for cart updates
    window.addEventListener("cartUpdated", () => {
      this.updateCartDisplay()
    })
  }

  updateBodyPadding() {
    const isMobile = window.innerWidth <= 768
    if (isMobile) {
      document.body.style.paddingTop = "120px" // navbar + search
    } else {
      document.body.style.paddingTop = "70px" // navbar only
    }
  }

  handleResize() {
    if (window.innerWidth > 768) {
      this.closeMobileMenu()
      this.closeFilter()
    }
  }

  updateCart() {
    this.updateCartDisplay()
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent("cartUpdated"))
  }

  getCartItems() {
    return JSON.parse(localStorage.getItem("carrinho") || "[]")
  }

  clearCart() {
    localStorage.removeItem("carrinho")
    this.updateCartDisplay()
    window.dispatchEvent(new CustomEvent("cartUpdated"))
  }
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    // Initialize professional navigation
    const navigation = new ProfessionalNavigation()

    // Make navigation globally available
    window.fmNavigation = navigation

    console.log("✅ Sistema de navegação profissional inicializado com sucesso!")
  } catch (error) {
    console.error("❌ Erro ao inicializar navegação:", error)
  }
})

if (typeof window.mobileNavbar === "undefined") {
  window.mobileNavbar = {
    init: () => {
      console.log("Sistema de navegação já inicializado")
    },
  }
}
