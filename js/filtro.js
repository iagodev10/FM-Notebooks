// ===========================
// LISTA DE PRODUTOS COMPLETA
// ===========================
window.addEventListener("DOMContentLoaded", () => {
    const produtos = [
        // Mochilas
        {
            id: 1,
            nome: "Mochila Kross Elegance Clean Black",
            descricao: "Carregue seus itens com segurança, estilo e conforto.",
            preco: "R$ 105,00",
            categoria: "mochilas",
            marca: "Kross",
            img: "img/mochilas/kross-elegance.png",
            imagens: [
                "img/mochilas/kross-elegance.png",
                "img/mochilas/lenovo-casual-removebg-preview.png",
                "img/mochilas/lenovo-casual.png",
                "img/mochilas/redemption.png"
            ],
            especificacoes: [
                { titulo: "Capacidade", valor: "25 litros" },
                { titulo: "Material", valor: "Poliéster resistente à água" },
                { titulo: "Compartimentos", valor: "3 principais + divisórias internas" },
                { titulo: "Dimensões", valor: "45 x 30 x 18 cm" },
                { titulo: "Peso", valor: "700g" },
                { titulo: "USB", valor: "Entrada para carregamento" }
            ]
        },
        {
            id: 2,
            nome: "Mochila Lenovo Casual B210",
            descricao: "Praticidade e estilo para o dia a dia.",
            preco: "R$ 122,00",
            categoria: "mochilas",
            marca: "Lenovo",
            img: "img/mochilas/lenovo-casual.png"
        },
        {
            id: 3,
            nome: "Mochila Kross Elegance Redemption",
            descricao: "Mochila Redemption para Notebook - Estilo e resistência.",
            preco: "R$ 205,00",
            categoria: "mochilas",
            marca: "Kross",
            img: "img/mochilas/redemption.png"
        },

        // Mouse Pads
        {
            id: 4,
            nome: "Mouse Pad Gamer LED MP003",
            descricao: "Antiderrapante, LED RGB e superfície extra grande.",
            preco: "R$ 155,90",
            categoria: "mousepads",
            marca: "Bright",
            img: "img/mousepads/mp003.png"
        },
        {
            id: 5,
            nome: "Mouse Pad Bright Tapete Office",
            descricao: "Desempenho e estilo elegante para escritórios.",
            preco: "R$ 95,00",
            categoria: "mousepads",
            marca: "Bright",
            img: "img/mousepads/tapete.png"
        },
        {
            id: 6,
            nome: "Mouse Pad Bright League of Legends",
            descricao: "Tamanho grande (70x30 cm) com estampa temática.",
            preco: "R$ 55,90",
            categoria: "mousepads",
            marca: "Bright",
            img: "img/mousepads/lol.png"
        },
        {
            id: 7,
            nome: "Mouse Pad Bright Game Arme",
            descricao: "Superfície ampla (70x30 cm) com tema camuflado.",
            preco: "R$ 55,90",
            categoria: "mousepads",
            marca: "Bright",
            img: "img/mousepads/game-arme.png"
        },
        {
            id: 8,
            nome: "Mouse Pad Bright Ergonômico",
            descricao: "Superfície confortável com apoio de pulso.",
            preco: "R$ 32,00",
            categoria: "mousepads",
            marca: "Bright",
            img: "img/mousepads/ergonomico.png"
        },

        // Mouses
        {
            id: 9,
            nome: "Mouse Gamer Acer Nitro NMW200",
            descricao: "Desempenho elevado para jogos.",
            preco: "R$ 212,00",
            categoria: "mouses",
            marca: "Acer",
            img: "img/mouses/nmw200.png"
        },
        {
            id: 10,
            nome: "Mouse Logitech Sem-Fio M185 AZUL",
            descricao: "Conforto e precisão sem fio.",
            preco: "R$ 129,90",
            categoria: "mouses",
            marca: "Logitech",
            img: "img/mouses/logitech-azul.png"
        },

        // Combos
        {
            id: 19,
            nome: "Combo Teclado e Mouse Sem Fio Bright",
            descricao: "Conectividade 2.4GHz sem fio com conforto.",
            preco: "R$ 119,90",
            categoria: "combos",
            marca: "Bright",
            img: "img/combos/combo-bright.png"
        },
        {
            id: 20,
            nome: "Kit Gamer Kross Mouse + Teclado",
            descricao: "Combo gamer completo com 5 itens.",
            preco: "R$ 199,99",
            categoria: "combos",
            marca: "Kross",
            img: "img/combos/kit-gamer.png"
        },

        // Headphones
        {
            id: 23,
            nome: "Headphone JBL Tune 500 Preto",
            descricao: "Som JBL Pure Bass com design dobrável.",
            preco: "R$ 199,20",
            categoria: "headphones",
            marca: "JBL",
            img: "img/headphones/jbl-tune-500.png"
        },
        {
            id: 24,
            nome: "Headset JBL Quantum 100",
            descricao: "Som envolvente com microfone destacável.",
            preco: "R$ 237,42",
            categoria: "headphones",
            marca: "JBL",
            img: "img/headphones/jbl-quantum.png"
        },
        {
            id: 25,
            nome: "Headphone JBL Tune 520BT Bluetooth",
            descricao: "Fones sem fio com 57h de bateria.",
            preco: "R$ 297,20",
            categoria: "headphones",
            marca: "JBL",
            img: "img/headphones/jbl-520bt.png"
        },
        {
            id: 26, nome: "Fone de Ouvido Bluetooth JBL TUNE 520BT Branco",
            descricao: "Som potente com estilo elegante.",
            preco: "R$ 297,20",
            categoria: "headphones",
            marca: "JBL",
            img: "img/headphones/jbl-520bt-white.png"
        }
    ];


    let filtroTexto = "";           // Texto atual de busca
    let categoriasAtivas = ["todas"]; // Categorias ativas
    let marcasAtivas = [];

    // Elementos
    const busca = document.getElementById("input-busca");
    const resultado = document.getElementById("lista-produtos");
    const checkboxesCategoria = document.querySelectorAll(".input-checkbox-categoria");
    const checkboxesMarca = document.querySelectorAll(".input-checkbox-marca");

    // ===========================
    // FUNÇÃO DE EXIBIÇÃO
    // ===========================
    function exibirProdutos() {
        resultado.innerHTML = "";

        const filtrados = produtos.filter(p => {
            const textoCombina = p.nome.toLowerCase().includes(filtroTexto.toLowerCase());
            const todasSelecionadas = categoriasAtivas.includes("todas");

            //CATEGORIA
            const categoriaCombina = todasSelecionadas || categoriasAtivas.includes(p.categoria);

            // MARCA
            const marcaCombina = marcasAtivas.length === 0 || marcasAtivas.includes(p.marca);

            return textoCombina && categoriaCombina && marcaCombina;
        });

        if (filtrados.length === 0) {
            resultado.innerHTML = "<p>Nenhum produto encontrado</p>";
            return;
        }

        filtrados.forEach(produto => {
            const div = document.createElement("div");
            div.className = "produto";
            div.innerHTML = `
        <a href="detalhes.html?id=${produto.id}" class="link-produto">
            <img src="${produto.img}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
        </a>
        <div class="preco"><span>${produto.preco}</span></div>
        <a href="detalhes.html?id=${produto.id}" class="ver-tudo-btn">Ver Detalhes</a>
    `;
            resultado.appendChild(div);
        });
    }

    // ===========================
    // BUSCA
    // ===========================
    busca.addEventListener("input", e => {
        filtroTexto = e.target.value.trim();
        exibirProdutos();
    });

    // ===========================
    // CHECKBOXES DE CATEGORIA
    // ===========================
    checkboxesCategoria.forEach(cb => {
        cb.addEventListener("change", e => {
            const cat = e.target.getAttribute("data-categoria");

            if (cat === "todas" && e.target.checked) {
                categoriasAtivas = ["todas"];
                checkboxesCategoria.forEach(box => {
                    if (box.getAttribute("data-categoria") !== "todas") {
                        box.checked = false;
                    }
                });
            }
            else if (cat === "todas" && !e.target.checked) {
                categoriasAtivas = [];
            }
            else {
                if (e.target.checked) {
                    categoriasAtivas.push(cat);
                }
                else {
                    categoriasAtivas = categoriasAtivas.filter(c => c !== cat);
                }

                if (categoriasAtivas.length > 0) {
                    const todasCheckbox = document.querySelector('.input-checkbox-categoria[data-categoria="todas"]');
                    if (todasCheckbox) todasCheckbox.checked = false;
                    categoriasAtivas = categoriasAtivas.filter(c => c !== "todas");
                }
                if (categoriasAtivas.length === 0) {
                    categoriasAtivas = ["todas"];
                    const todasCheckbox = document.querySelector('.input-checkbox-categoria[data-categoria="todas"]');
                    if (todasCheckbox) todasCheckbox.checked = true;
                }
            }

            exibirProdutos();
        });
    });


    // ===========================
    // CHECKBOXES DE MARCA
    // ===========================
    checkboxesMarca.forEach(cb => {
        cb.addEventListener("change", e => {
            const marca = e.target.getAttribute("data-marca");

            if (e.target.checked) {
                if (!marcasAtivas.includes(marca)) {
                    marcasAtivas.push(marca);
                }
            }
            else {
                marcasAtivas = marcasAtivas.filter(m => m !== marca);
            }
            exibirProdutos();
        });
    });

    // ===========================
    // LER CATEGORIA DA URL
    // ===========================
    const urlParams = new URLSearchParams(window.location.search);
    const categoriaInicial = urlParams.get("categoria");

    if (categoriaInicial) {
        categoriasAtivas = [categoriaInicial];
        checkboxes.forEach(box => {
            box.checked = (box.getAttribute("data-categoria") === categoriaInicial);
        });
    }

    // ===========================
    // INICIALIZAR
    // ===========================
    exibirProdutos();
});
