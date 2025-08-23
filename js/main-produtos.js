class ResponsiveNavigation {
    constructor() {
        this.mobileMenu = document.querySelector(".mobile-menu")
        this.navList = document.querySelector(".nav-list")
        this.navLinks = document.querySelectorAll(".nav-list a")
        this.overlay = document.querySelector(".overlay")
        this.filterToggle = document.querySelector(".toggle-filtro-btn")
        this.filterPanel = document.querySelector(".filtro-fi")
        this.filterClose = document.querySelector(".close-filtro")

        this.init()
    }

    init() {
        this.setupMobileMenu()
        this.setupMobileFilter()
        this.setupResponsiveAdjustments()
        this.setupOverlay()
    }

    setupMobileMenu() {
        if (this.mobileMenu && this.navList) {
            this.mobileMenu.addEventListener("click", () => {
                this.toggleMobileMenu()
            })

            // Fechar menu ao clicar nos links
            this.navLinks.forEach((link) => {
                link.addEventListener("click", () => {
                    this.closeMobileMenu()
                })
            })
        }
    }

    toggleMobileMenu() {
        const isActive = this.navList.classList.contains("active")

        if (isActive) {
            this.closeMobileMenu()
        } else {
            this.openMobileMenu()
        }
    }

    openMobileMenu() {
        this.navList.classList.add("active")
        this.mobileMenu.classList.add("active")
        this.overlay.classList.add("active")
        document.body.style.overflow = "hidden"

        // Animação dos links
        this.animateNavLinks()
    }

    closeMobileMenu() {
        this.navList.classList.remove("active")
        this.mobileMenu.classList.remove("active")
        this.overlay.classList.remove("active")
        document.body.style.overflow = ""
    }

    animateNavLinks() {
        this.navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = ""
            } else {
                link.style.animation = `navLinkFade 0.45s ease forwards ${index / 7 + 0.2}s`
            }
        })
    }

    setupMobileFilter() {
        if (this.filterToggle && this.filterPanel) {
            // Botão para mostrar filtro
            this.filterToggle.addEventListener("click", () => {
                this.openFilter()
            })

            // Botão para fechar filtro
            if (this.filterClose) {
                this.filterClose.addEventListener("click", () => {
                    this.closeFilter()
                })
            }
        }
    }

    openFilter() {
        this.filterPanel.classList.add("active")
        this.overlay.classList.add("active")
        document.body.style.overflow = "hidden"

        // Atualizar texto do botão
        if (this.filterToggle) {
            this.filterToggle.innerHTML = '<i class="fas fa-filter"></i> Ocultar Filtros'
        }
    }

    closeFilter() {
        this.filterPanel.classList.remove("active")
        this.overlay.classList.remove("active")
        document.body.style.overflow = ""

        // Restaurar texto do botão
        if (this.filterToggle) {
            this.filterToggle.innerHTML = '<i class="fas fa-filter"></i> Mostrar Filtros'
        }
    }

    setupOverlay() {
        if (this.overlay) {
            this.overlay.addEventListener("click", () => {
                this.closeMobileMenu()
                this.closeFilter()
            })
        }
    }

    setupResponsiveAdjustments() {
        // Ajustar padding do body baseado no tamanho da tela
        this.updateBodyPadding()

        // Listener para mudanças de tamanho da tela
        window.addEventListener("resize", () => {
            this.updateBodyPadding()
            this.handleResize()
        })

        // Fechar menus com ESC
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                this.closeMobileMenu()
                this.closeFilter()
            }
        })
    }

    updateBodyPadding() {
        const header = document.querySelector("header")
        if (header) {
            if (window.innerWidth <= 999) {
                // Mobile: header com barra de pesquisa
                document.body.style.paddingTop = "100px"
            } else {
                // Desktop: apenas header
                document.body.style.paddingTop = "80px"
            }
        }
    }

    handleResize() {
        if (window.innerWidth > 999) {
            // Fechar menus mobile quando voltar para desktop
            this.closeMobileMenu()
            this.closeFilter()
        }
    }
}

class ProductSearch {
    constructor() {
        this.searchInput = document.querySelector("#input-busca")
        this.searchIcon = document.querySelector(".search-wrap i")

        this.init()
    }

    init() {
        if (this.searchInput) {
            // Busca em tempo real
            this.searchInput.addEventListener("input", (e) => {
                this.performSearch(e.target.value)
            })

            // Busca ao clicar no ícone
            if (this.searchIcon) {
                this.searchIcon.addEventListener("click", () => {
                    this.performSearch(this.searchInput.value)
                })
            }

            // Busca ao pressionar Enter
            this.searchInput.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    this.performSearch(e.target.value)
                }
            })
        }
    }

    performSearch(query) {
        console.log("Buscando por:", query)
        // Aqui você conectaria com sua lógica de busca de produtos
        // Exemplo: filtrarProdutos(query)
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Inicializar navegação responsiva
    const navigation = new ResponsiveNavigation()

    // Inicializar busca de produtos
    const productSearch = new ProductSearch()

    console.log("Sistema responsivo inicializado com sucesso!")
})

// Manter compatibilidade com código legado se necessário
if (typeof window.mobileNavbar === "undefined") {
    window.mobileNavbar = {
        init: () => {
            console.log("Sistema responsivo já inicializado")
        },
    }
}
