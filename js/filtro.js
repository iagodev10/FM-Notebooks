// ===========================
// LISTA DE PRODUTOS COMPLETA
// ===========================
window.addEventListener("DOMContentLoaded", () => {
    const produtos = [
        // Mochilas
        { id: 1, nome: "Mochila Kross Elegance Clean Black", descricao: "Carregue seus itens com segurança, estilo e conforto.", preco: "R$ 105,00", categoria: "mochilas", img: "img/mochilas/kross-elegance.png" },
        { id: 2, nome: "Mochila Lenovo Casual B210", descricao: "Praticidade e estilo para o dia a dia.", preco: "R$ 122,00", categoria: "mochilas", img: "img/mochilas/lenovo-casual.png" },
        { id: 3, nome: "Mochila Kross Elegance Redemption", descricao: "Mochila Redemption para Notebook - Estilo e resistência.", preco: "R$ 205,00", categoria: "mochilas", img: "img/mochilas/redemption.png" },

        // Mouse Pads
        { id: 4, nome: "Mouse Pad Gamer LED MP003", descricao: "Antiderrapante, LED RGB e superfície extra grande.", preco: "R$ 155,90", categoria: "mousepads", img: "img/mousepads/mp003.png" },
        { id: 5, nome: "Mouse Pad Bright Tapete Office", descricao: "Desempenho e estilo elegante para escritórios.", preco: "R$ 95,00", categoria: "mousepads", img: "img/mousepads/tapete.png" },
        { id: 6, nome: "Mouse Pad Bright League of Legends", descricao: "Tamanho grande (70x30 cm) com estampa temática.", preco: "R$ 55,90", categoria: "mousepads", img: "img/mousepads/lol.png" },
        { id: 7, nome: "Mouse Pad Bright Game Arme", descricao: "Superfície ampla (70x30 cm) com tema camuflado.", preco: "R$ 55,90", categoria: "mousepads", img: "img/mousepads/game-arme.png" },
        { id: 8, nome: "Mouse Pad Bright Ergonômico", descricao: "Superfície confortável com apoio de pulso.", preco: "R$ 32,00", categoria: "mousepads", img: "img/mousepads/ergonomico.png" },

        // Mouses
        { id: 9, nome: "Mouse Gamer Acer Nitro NMW200", descricao: "Desempenho elevado para jogos.", preco: "R$ 212,00", categoria: "mouses", img: "img/mouses/nmw200.png" },
        { id: 10, nome: "Mouse Logitech Sem-Fio M185 AZUL", descricao: "Conforto e precisão sem fio.", preco: "R$ 129,90", categoria: "mouses", img: "img/mouses/logitech-azul.png" },

        // Combos
        { id: 19, nome: "Combo Teclado e Mouse Sem Fio Bright", descricao: "Conectividade 2.4GHz sem fio com conforto.", preco: "R$ 119,90", categoria: "combos", img: "img/combos/combo-bright.png" },
        { id: 20, nome: "Kit Gamer Kross Mouse + Teclado", descricao: "Combo gamer completo com 5 itens.", preco: "R$ 199,99", categoria: "combos", img: "img/combos/kit-gamer.png" },

        // Headphones
        { id: 23, nome: "Headphone JBL Tune 500 Preto", descricao: "Som JBL Pure Bass com design dobrável.", preco: "R$ 199,20", categoria: "headphones", img: "img/headphones/jbl-tune-500.png" },
        { id: 24, nome: "Headset JBL Quantum 100", descricao: "Som envolvente com microfone destacável.", preco: "R$ 237,42", categoria: "headphones", img: "img/headphones/jbl-quantum.png" },
        { id: 25, nome: "Headphone JBL Tune 520BT Bluetooth", descricao: "Fones sem fio com 57h de bateria.", preco: "R$ 297,20", categoria: "headphones", img: "img/headphones/jbl-520bt.png" },
        { id: 26, nome: "Fone de Ouvido Bluetooth JBL TUNE 520BT Branco", descricao: "Som potente com estilo elegante.", preco: "R$ 297,20", categoria: "headphones", img: "img/headphones/jbl-520bt-white.png" }
    ];

    let filtroTexto = "";           // Texto atual de busca
    let categoriasAtivas = ["todas"]; // Categorias ativas

    // Elementos
    const busca = document.getElementById("input-busca");
    const resultado = document.getElementById("lista-produtos");
    const checkboxes = document.querySelectorAll(".input-checkbox");

    // ===========================
    // FUNÇÃO DE EXIBIÇÃO
    // ===========================
    function exibirProdutos() {
        resultado.innerHTML = "";

        const filtrados = produtos.filter(p => {
            const textoCombina = p.nome.toLowerCase().includes(filtroTexto.toLowerCase());
            const todasSelecionadas = categoriasAtivas.includes("todas");
            const categoriaCombina = todasSelecionadas || categoriasAtivas.includes(p.categoria);
            return textoCombina && categoriaCombina;
        });

        if (filtrados.length === 0) {
            resultado.innerHTML = "<p>Nenhum produto encontrado</p>";
            return;
        }

        filtrados.forEach(produto => {
            const div = document.createElement("div");
            div.className = "produto";
            div.innerHTML = `
            <img src="${produto.img}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <div class="preco"><span>${produto.preco}</span></div>
            <button class="ver-tudo-btn"><a href="#">Ver Produto</a></button>
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
    checkboxes.forEach(cb => {
        cb.addEventListener("change", e => {
            const cat = e.target.getAttribute("data-categoria");

            if (cat === "todas" && e.target.checked) {
                categoriasAtivas = ["todas"];
                checkboxes.forEach(box => {
                    if (box.getAttribute("data-categoria") !== "todas") {
                        box.checked = false;
                    }
                });
            } else if (cat === "todas" && !e.target.checked) {
                categoriasAtivas = [];
            } else {
                if (e.target.checked) {
                    categoriasAtivas.push(cat);
                } else {
                    categoriasAtivas = categoriasAtivas.filter(c => c !== cat);
                }
                if (categoriasAtivas.length > 0) {
                    document.querySelector('.input-checkbox[data-categoria="todas"]').checked = false;
                    categoriasAtivas = categoriasAtivas.filter(c => c !== "todas");
                }
                if (categoriasAtivas.length === 0) {
                    categoriasAtivas = ["todas"];
                    document.querySelector('.input-checkbox[data-categoria="todas"]').checked = true;
                }
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
