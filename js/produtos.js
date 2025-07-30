const produtos = [
    // Mochilas
    { id: 1, nome: "Mochila Kross Elegance Clean Black", descricao: "Carregue seus itens com segurança, estilo e conforto. R$105,00", categoria: "mochilas" },
    { id: 2, nome: "Mochila Lenovo Casual B210", descricao: "Praticidade e estilo para o dia a dia. R$122,00", categoria: "mochilas" },
    { id: 3, nome: "Mochila Kross Elegance Redemption", descricao: "Mochila Redemption para Notebook - Estilo e resistência. R$205,00", categoria: "mochilas" },

    // Mouse Pads
    { id: 4, nome: "Mouse Pad Gamer LED MP003", descricao: "Antiderrapante, LED RGB e superfície extra grande. R$155,90", categoria: "mousepads" },
    { id: 5, nome: "Mouse Pad Bright Tapete Office", descricao: "Desempenho e estilo elegante para escritórios. R$95,00", categoria: "mousepads" },
    { id: 6, nome: "Mouse Pad Bright League of Legends", descricao: "Tamanho grande (70x30 cm) com estampa temática. R$55,90", categoria: "mousepads" },
    { id: 7, nome: "Mouse Pad Bright Game Arme", descricao: "Superfície ampla (70x30 cm) com tema camuflado. R$55,90", categoria: "mousepads" },
    { id: 8, nome: "Mouse Pad Bright Ergonômico", descricao: "Superfície confortável com apoio de pulso. R$32,00", categoria: "mousepads" },

    // Mouses
    { id: 9, nome: "Mouse Gamer Acer Nitro NMW200", descricao: "Desempenho elevado para jogos. R$212,00", categoria: "mouses" },
    { id: 10, nome: "Mouse Logitech Sem-Fio M185 AZUL", descricao: "Conforto e precisão sem fio. R$129,90", categoria: "mouses" },
    /* ... demais mouses com categoria "mouses" ... */

    // Combos
    { id: 19, nome: "Combo Teclado e Mouse Sem Fio Bright", descricao: "Conectividade 2.4GHz sem fio com conforto. R$119,90", categoria: "combos" },
    { id: 20, nome: "Kit Gamer Kross Mouse + Teclado", descricao: "Combo gamer completo com 5 itens. R$199,99", categoria: "combos" },
    /* demais combos com categoria "combos" ... */

    // Fones e Headphones
    { id: 23, nome: "Headphone JBL Tune 500 Preto", descricao: "Som JBL Pure Bass com design dobrável. R$199,20", categoria: "headphones" },
    { id: 24, nome: "Headset JBL Quantum 100", descricao: "Som envolvente com microfone destacável. R$237,42", categoria: "headphones" },
    { id: 25, nome: "Headphone JBL Tune 520BT Bluetooth", descricao: "Fones sem fio com 57h de bateria. R$297,20", categoria: "headphones" },
    { id: 26, nome: "Fone de Ouvido Bluetooth JBL TUNE 520BT Branco", descricao: "Som potente com estilo elegante. R$297,20", categoria: "headphones" }
];

const busca = document.getElementById('input-busca');
const resultado = document.getElementById('resultado');

busca.addEventListener("input", () => {
    const termo = busca.value.toLowerCase();
    resultado.innerHTML = "";

    const filtrados = produtos.filter(p =>
        p.nome.toLowerCase().includes(termo)
    );
});