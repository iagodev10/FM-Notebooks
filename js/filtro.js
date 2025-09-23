let totalEl = document.querySelector(".cart-total .total-info span");
const carrinhoButtons = document.querySelectorAll('.abrir-carrinho');
    const carrinhoIcons = document.querySelectorAll('.nav-cart a');
    const carrinho = document.getElementById('carrinho-overlay');
    
    const fecharCarrinho = document.getElementById('fechar-carrinho');
    const navElement = document.querySelector('nav');

    // Adiciona evento de clique aos botões de abrir carrinho
    if (carrinhoButtons && carrinho) {
      carrinhoButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          carrinho.style.display = 'flex';
          document.body.style.overflow = 'hidden';
        });
      });
    }

    // Adiciona evento de clique aos ícones do carrinho no menu
    if (carrinhoIcons && carrinho) {
      carrinhoIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
          e.preventDefault();
          carrinho.style.display = 'flex';
          document.body.style.overflow = 'hidden';
        });
      });
    }

    // Adiciona evento de clique ao ícone do carrinho no modo responsivo (pseudo-elemento ::after)
    if (navElement && carrinho) {
      navElement.addEventListener('click', (e) => {
        // Verifica se o clique foi no pseudo-elemento ::after (ícone do carrinho)
        // Calculando a posição do clique em relação ao elemento nav
        const navRect = navElement.getBoundingClientRect();
        const clickX = e.clientX - navRect.left;

        // Se o clique foi na área direita do nav (onde está o ícone do carrinho)
        if (clickX > navRect.width - 60) {
          e.preventDefault();
          carrinho.style.display = 'flex';
          document.body.style.overflow = 'hidden';
        }
      });
    }

    if (fecharCarrinho && carrinho) {
      fecharCarrinho.addEventListener('click', () => {
        carrinho.style.display = 'none';
        document.body.style.overflow = 'auto';
      });
    }

    function renderCarrinho() {
      const carrinho = getCarrinho();
      const container = document.querySelector(".items-add");
      const vazio = document.querySelector(".cart-vazio");
      const totalEl = document.querySelector(".cart-total .total-info span");
    
      if (!container) return; // carrinho não está na página
      container.innerHTML = "";
    
      if (carrinho.length === 0) {
        if (vazio) vazio.style.display = "block";
        if (totalEl) totalEl.textContent = "Total: R$ 0,00";
        return;
      } else {
        if (vazio) vazio.style.display = "none";
      }
    
      let total = 0;
    
      carrinho.forEach(produto => {
        total += produto.preco * produto.quantidade;
    
        const div = document.createElement("div");
        div.className = "item";
        div.innerHTML = `
          <div class="item-cont">
            <div class="item-img">
              <img src="${produto.img}" alt="${produto.nome}">
            </div>
            <div class="item-desc">
              <p>${produto.nome}</p>
              <span>R$ ${produto.preco.toFixed(2)}</span>
            </div>
          </div>
          <div class="item-add-or-delete">
            <div class="quantidade-container">
              <button class="quantidade-btn diminuir">-</button>
              <input type="text" class="item-quantidade" value="${produto.quantidade}" min="1">
              <button class="quantidade-btn aumentar">+</button>
            </div>
            <button class="remover-item"><i class="fa fa-trash"></i> Remover</button>
          </div>
        `;
    
        // Eventos
        div.querySelector(".diminuir").addEventListener("click", () => alterarQuantidade(produto.id, -1));
        div.querySelector(".aumentar").addEventListener("click", () => alterarQuantidade(produto.id, 1));
        div.querySelector(".remover-item").addEventListener("click", () => removerDoCarrinho(produto.id));
    
        container.appendChild(div);
      });
    
      if (totalEl) totalEl.textContent = `Total: R$ ${total.toFixed(2)}`;
    }


    // Fecha carrinho ao clicar fora dele
    if (carrinho) {
      carrinho.addEventListener('click', (e) => {
        if (e.target === carrinho) {
          carrinho.style.display = 'none';
          document.body.style.overflow = 'auto';
        }
      });
    }

    // Utilidades para Local Storage
function getCarrinho() {
  return JSON.parse(localStorage.getItem("carrinho")) || [];
}

function setCarrinho(carrinho) {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// Adicionar produto ao carrinho
function adicionarAoCarrinho(produto) {
 
  let carrinho = getCarrinho();

  const existente = carrinho.find(p => p.id === produto.id);
  if (existente) {
    existente.quantidade += 1;
  } else {
    carrinho.push({ ...produto, quantidade: 1 });
  }

  setCarrinho(carrinho);
  renderCarrinho();
}

// Remover item
function removerDoCarrinho(id) {
  let carrinho = getCarrinho().filter(p => p.id !== id);
  const prod=getCarrinho().filter(p => p.id == id);
  totalEl-=prod.precoProd
  setCarrinho(carrinho);
  renderCarrinho();
}

// Alterar quantidade
function alterarQuantidade(id, delta) {
  let carrinho = getCarrinho();
  carrinho = carrinho.map(p => {
    if (p.id === id) {
      p.quantidade = Math.max(1, p.quantidade + delta);
    }
    return p;
  });
  setCarrinho(carrinho);
  renderCarrinho();
}


function finalizarCompra() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  // monta a mensagem
  let mensagem = "Olá, tudo bem? Gostaria de finalizar minha compra:\n\n";
  carrinho.forEach(item => {
    mensagem += `• ${item.quantidade}x ${item.nome}\n`;
  });

  // telefone de destino (substitua pelo seu!)
  const telefone = "5534998723042"; 

  // gera o link para WhatsApp
  const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

  // abre o WhatsApp
  window.open(url, "_blank");
}


// ===========================
// LISTA DE PRODUTOS COMPLETA
// ===========================
window.addEventListener("DOMContentLoaded", () => {
  renderCarrinho();
  fetch("http://localhost:5090/produtos", {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) throw new Error("Erro ao obter informações")
      return response.json()
    })
    .then((data) => {
      produtos = data
      console.log("Produtos carregados da API:", data)
      exibirProdutos()
    })
    .catch((error) => {
      console.error("Erro ao obter produtos da API, usando dados locais:", error)
      produtos = produtosLocais
      exibirProdutos()
    })

  fetch("http://localhost:5090/promocoes", {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) throw new Error("Erro ao obter promoções")
      return response.json()
    })
    .then((data) => {
      const divLista = document.getElementById("listaPromos")
      if (divLista) {
        data.forEach((promo) => {
          const label = document.createElement("label")
          label.className = "label-filtro"

          const input = document.createElement("input")
          input.type = "checkbox"
          input.className = "input-checkbox-promocao"
          input.name = promo.idPromo

          const span = document.createElement("span")
          span.className = "custom-checkbox"

          const span2 = document.createElement("span")
          span2.className = "texto-label"
          span2.innerText = promo.nomePromocao

          label.appendChild(input)
          label.appendChild(span)
          label.appendChild(span2)
          divLista.appendChild(label)

          input.addEventListener("change", (e) => {
            const promocao = String(e.target.getAttribute("name"))

            if (e.target.checked) {
              if (!promocoesAtivas.includes(promocao)) {
                promocoesAtivas.push(promocao)
              }
            } else {
              promocoesAtivas = promocoesAtivas.filter((m) => m !== promocao)
            }
            exibirProdutos()
          })
        })
      }
    })
    .catch((error) => console.error("Erro ao obter promoções:", error))

    /*
  const produtosLocais = [
    // Mochilas
    {
      idProd: 1,
      nomeProd: "Mochila Kross Elegance Clean Black",
      descricao: "Carregue seus itens com segurança, estilo e conforto.",
      precoProd: "105,00",
      catProd: "mochilas",
      marcaProd: "Kross",
      urlImgProd1: "/mochila-preta-elegante.jpg",
      idPromoVinc: null,
    },
    {
      idProd: 2,
      nomeProd: "Mochila Lenovo Casual B210",
      descricao: "Praticidade e estilo para o dia a dia.",
      precoProd: "122,00",
      catProd: "mochilas",
      marcaProd: "Lenovo",
      urlImgProd1: "/mochila-lenovo-casual.jpg",
      idPromoVinc: null,
    },
    {
      idProd: 3,
      nomeProd: "Mochila Kross Elegance Redemption",
      descricao: "Mochila Redemption para Notebook - Estilo e resistência.",
      precoProd: "205,00",
      catProd: "mochilas",
      marcaProd: "Kross",
      urlImgProd1: "/mochila-gamer-redemption.jpg",
      idPromoVinc: null,
    },

    // Mouse Pads
    {
      idProd: 4,
      nomeProd: "Mouse Pad Gamer LED MP003",
      descricao: "Antiderrapante, LED RGB e superfície extra grande.",
      precoProd: "155,90",
      catProd: "mousepads",
      marcaProd: "Bright",
      urlImgProd1: "/mousepad-gamer-led-rgb.jpg",
      idPromoVinc: null,
    },
    {
      idProd: 5,
      nomeProd: "Mouse Pad Bright Tapete Office",
      descricao: "Desempenho e estilo elegante para escritórios.",
      precoProd: "95,00",
      catProd: "mousepads",
      marcaProd: "Bright",
      urlImgProd1: "/mousepad-office-elegante.jpg",
      idPromoVinc: null,
    },
    {
      idProd: 6,
      nomeProd: "Mouse Pad Bright League of Legends",
      descricao: "Tamanho grande (70x30 cm) com estampa temática.",
      precoProd: "55,90",
      catProd: "mousepads",
      marcaProd: "Bright",
      urlImgProd1: "/mousepad-league-of-legends.jpg",
      idPromoVinc: null,
    },
    {
      idProd: 7,
      nomeProd: "Mouse Pad Bright Game Arme",
      descricao: "Superfície ampla (70x30 cm) com tema camuflado.",
      precoProd: "55,90",
      catProd: "mousepads",
      marcaProd: "Bright",
      urlImgProd1: "/mousepad-camuflado-militar.jpg",
      idPromoVinc: null,
    },
    {
      idProd: 8,
      nomeProd: "Mouse Pad Bright Ergonômico",
      descricao: "Superfície confortável com apoio de pulso.",
      precoProd: "32,00",
      catProd: "mousepads",
      marcaProd: "Bright",
      urlImgProd1: "/mousepad-ergonomico-apoio-pulso.jpg",
      idPromoVinc: null,
    },

    // Mouses
    {
      idProd: 9,
      nomeProd: "Mouse Gamer Acer Nitro NMW200",
      descricao: "Desempenho elevado para jogos.",
      precoProd: "212,00",
      catProd: "mouses",
      marcaProd: "Acer",
      urlImgProd1: "/mouse-gamer-acer-nitro.jpg",
      idPromoVinc: null,
    },
    {
      idProd: 10,
      nomeProd: "Mouse Logitech Sem-Fio M185 AZUL",
      descricao: "Conforto e precisão sem fio.",
      precoProd: "129,90",
      catProd: "mouses",
      marcaProd: "Logitech",
      urlImgProd1: "/mouse-logitech-azul-wireless.jpg",
      idPromoVinc: null,
    },

    // Combos
    {
      idProd: 19,
      nomeProd: "Combo Teclado e Mouse Sem Fio Bright",
      descricao: "Conectividade 2.4GHz sem fio com conforto.",
      precoProd: "119,90",
      catProd: "combos",
      marcaProd: "Bright",
      urlImgProd1: "/combo-teclado-mouse-wireless.jpg",
      idPromoVinc: null,
    },
    {
      idProd: 20,
      nomeProd: "Kit Gamer Kross Mouse + Teclado",
      descricao: "Combo gamer completo com 5 itens.",
      precoProd: "199,99",
      catProd: "combos",
      marcaProd: "Kross",
      urlImgProd1: "/kit-gamer-teclado-mouse-headset.jpg",
      idPromoVinc: null,
    },

    // Headphones
    {
      idProd: 23,
      nomeProd: "Headphone JBL Tune 500 Preto",
      descricao: "Som JBL Pure Bass com design dobrável.",
      precoProd: "199,20",
      catProd: "headphones",
      marcaProd: "JBL",
      urlImgProd1: "/headphone-jbl-tune-500-preto.jpg",
      idPromoVinc: null,
    },
    {
      idProd: 24,
      nomeProd: "Headset JBL Quantum 100",
      descricao: "Som envolvente com microfone destacável.",
      precoProd: "237,42",
      catProd: "headphones",
      marcaProd: "JBL",
      urlImgProd1: "/headset-jbl-quantum-gamer.jpg",
      idPromoVinc: null,
    },
    {
      idProd: 25,
      nomeProd: "Headphone JBL Tune 520BT Bluetooth",
      descricao: "Fones sem fio com 57h de bateria.",
      precoProd: "297,20",
      catProd: "headphones",
      marcaProd: "JBL",
      urlImgProd1: "/headphone-jbl-bluetooth-wireless.jpg",
      idPromoVinc: null,
    },
    {
      idProd: 26,
      nomeProd: "Fone de Ouvido Bluetooth JBL TUNE 520BT Branco",
      descricao: "Som potente com estilo elegante.",
      precoProd: "297,20",
      catProd: "headphones",
      marcaProd: "JBL",
      urlImgProd1: "/placeholder.svg?height=200&width=280",
      idPromoVinc: null,
    },
  ]
*/
  let produtos = []
  let filtroTexto = "" // Texto atual de busca
  let categoriasAtivas = ["todas"] // Categorias ativas
  let marcasAtivas = []
  let promocoesAtivas = []

  // Elementos
  const busca = document.getElementById("input-busca")
  const buscaMobile = document.getElementById("input-busca-mobile")
  const resultado = document.getElementById("lista-produtos")
  const checkboxesCategoria = document.querySelectorAll(".input-checkbox-categoria")
  const checkboxesMarca = document.querySelectorAll(".input-checkbox-marca")

  // ===========================
  // FUNÇÃO DE EXIBIÇÃO
  // ===========================
  function exibirProdutos() {
    if (!resultado) return

    // Mostrar loading
    if (window.fmNavigation) {
      window.fmNavigation.toggleLoading(true)
    }

    // Aguardar um pouco para mostrar o loading
    setTimeout(() => {
      resultado.innerHTML = ""
      const filtrados = produtos.filter((p) => {
        console.log("PROMOS ATIVAS",promocoesAtivas);
        console.log("DO PROD",p.catProd);
        console.log("DO PROD",p.marcaProd);
        console.log("ATIVO: "+categoriasAtivas);
        console.log("ATIVO: "+marcasAtivas);
        
        const textoCombina = p.nomeProd.toLowerCase().includes(filtroTexto.toLowerCase())
        const todasSelecionadas = categoriasAtivas.includes("todas")

        //CATEGORIA
        const categoriaCombina = todasSelecionadas || categoriasAtivas.includes(p.catProd.toLowerCase())

        // MARCA
        const marcaCombina = marcasAtivas.length === 0 || marcasAtivas.includes(p.marcaProd.toLowerCase())

        //PROMOCAO
        const promocaoCombina =
  promocoesAtivas.length === 0 || (p.idPromoVinc && promocoesAtivas.includes(String(p.idPromoVinc)))


        return textoCombina && categoriaCombina && marcaCombina && promocaoCombina
      })

      // Ocultar loading
      if (window.fmNavigation) {
        window.fmNavigation.toggleLoading(false)
        window.fmNavigation.updateProductsCounter(filtrados.length)
      }

      if (filtrados.length === 0) {
        if (window.fmNavigation) {
          window.fmNavigation.showNoProducts(true)
        }
        return
      }

      // Ocultar mensagem de nenhum produto
      if (window.fmNavigation) {
        window.fmNavigation.showNoProducts(false)
      }

      filtrados.forEach((produto, index) => {
        const div = document.createElement("div")
        div.className = "produto"
        div.innerHTML = `
                <div class="produto-imagem">
                    <img src="${produto.urlImgProd1}" alt="${produto.nomeProd}">
                </div>
                <div class="produto-info">
                    <h3>${produto.nomeProd}</h3>
                    <div class="preco"><span>R$ ${produto.precoProd}</span></div>
                    <div class="produto-actions">
                        <a href="detalhes.html?id=${produto.idProd}" class="comprar-btn" aria-label="Comprar ${produto.nomeProd}">Comprar</a>
                        <button class="add-carrinho-btn" aria-label="Adicionar ${produto.nomeProd} ao carrinho" disabled>
                        </button>
                    </div>
                </div>
            `
            const btn = div.querySelector(".add-carrinho-btn");
            btn.disabled = false;
    
            
            btn.addEventListener("click", () => {
              console.log("CART PROD: ",{
                id: produto.idProd,
                nome: produto.nomeProd,
                preco: parseFloat(produto.precoProd),
                img: produto.urlImgProd1
              });
              adicionarAoCarrinho({
                id: produto.idProd,
                nome: produto.nomeProd,
                preco: parseFloat(produto.precoProd),
                img: produto.urlImgProd1
              });
            });

        resultado.appendChild(div)

        // Animação de entrada
        setTimeout(() => {
          div.style.opacity = "0"
          div.style.transform = "translateY(20px)"
          div.style.transition = "all 0.3s ease"
          
          setTimeout(() => {
            div.style.opacity = "1"
            div.style.transform = "translateY(0)"
          }, index * 50)
        }, 50)
      })
    }, 300)
  }

  // ===========================
  // BUSCA
  // ===========================
  function setupSearch(input) {
    if (!input) return

    // Real-time search
    input.addEventListener("input", (e) => {
      filtroTexto = e.target.value.trim()
      exibirProdutos()

      const otherInput = input.id === "input-busca" ? buscaMobile : busca
      if (otherInput && otherInput.value !== e.target.value) {
        otherInput.value = e.target.value
      }
    })

    // Search on Enter
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault()
        exibirProdutos()
      }
    })
  }

  // Setup search for both inputs
  setupSearch(busca)
  setupSearch(buscaMobile)

  const searchButtons = document.querySelectorAll(".search-btn")
  searchButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault()
      const input = button.closest(".search-wrap, .mobile-search-content").querySelector("input")
      if (input) {
        filtroTexto = input.value.trim()
        exibirProdutos()
      }
    })
  })

  // ===========================
  // CHECKBOXES DE CATEGORIA
  // ===========================
  checkboxesCategoria.forEach((cb) => {
    cb.addEventListener("change", (e) => {
      const cat = e.target.getAttribute("data-categoria")

      if (cat === "todas" && e.target.checked) {
        categoriasAtivas = ["todas"]
        checkboxesCategoria.forEach((box) => {
          if (box.getAttribute("data-categoria") !== "todas") {
            box.checked = false
          }
        })
      } else if (cat === "todas" && !e.target.checked) {
        categoriasAtivas = []
      } else {
        if (e.target.checked) {
          categoriasAtivas.push(cat)
        } else {
          categoriasAtivas = categoriasAtivas.filter((c) => c !== cat)
        }

        if (categoriasAtivas.length > 0) {
          const todasCheckbox = document.querySelector('.input-checkbox-categoria[data-categoria="todas"]')
          if (todasCheckbox) todasCheckbox.checked = false
          categoriasAtivas = categoriasAtivas.filter((c) => c !== "todas")
        }
        if (categoriasAtivas.length === 0) {
          categoriasAtivas = ["todas"]
          const todasCheckbox = document.querySelector('.input-checkbox-categoria[data-categoria="todas"]')
          if (todasCheckbox) todasCheckbox.checked = true
        }
      }

      exibirProdutos()
    })
  })

  // ===========================
  // CHECKBOXES DE MARCA
  // ===========================
  checkboxesMarca.forEach((cb) => {
    cb.addEventListener("change", (e) => {
      const marca = e.target.getAttribute("data-marca")

      if (e.target.checked) {
        if (!marcasAtivas.includes(marca)) {
          marcasAtivas.push(marca)
        }
      } else {
        marcasAtivas = marcasAtivas.filter((m) => m !== marca)
      }
      exibirProdutos()
    })
  })

  // ===========================
  // LER CATEGORIA DA URL
  // ===========================
  const urlParams = new URLSearchParams(window.location.search)
  const categoriaInicial = urlParams.get("categoria")

  if (categoriaInicial) {
    categoriasAtivas = [categoriaInicial]
    checkboxesCategoria.forEach((box) => {
      box.checked = box.getAttribute("data-categoria") === categoriaInicial
    })
  }

  // ===========================
  // INICIALIZAR
  // ===========================
  // Aguardar um pouco para garantir que os produtos foram carregados
  setTimeout(() => {
    if (produtos.length === 0) {
      produtos = produtosLocais
    }
    exibirProdutos()
    
    // Garantir que o contador seja atualizado
    if (window.fmNavigation) {
      window.fmNavigation.updateProductsCounter(produtos.length)
    }
  }, 1000)
})
