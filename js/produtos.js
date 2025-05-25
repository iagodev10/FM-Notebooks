const produtos = [
    // Mochilas
    { id: 1, nome: "Mochila Kross Elegance Clean Black", descricao: "Carregue seus itens com segurança, estilo e conforto. R$105,00" },
    { id: 2, nome: "Mochila Lenovo Casual B210", descricao: "Praticidade e estilo para o dia a dia. R$122,00" },
    { id: 3, nome: "Mochila Kross Elegance Redemption", descricao: "Mochila Redemption para Notebook - Estilo e resistência. R$205,00" },

    // Mouse Pads
    { id: 4, nome: "Mouse Pad Gamer LED MP003", descricao: "Antiderrapante, LED RGB e superfície extra grande. R$155,90" },
    { id: 5, nome: "Mouse Pad Bright Tapete Office", descricao: "Desempenho e estilo elegante para escritórios. R$95,00" },
    { id: 6, nome: "Mouse Pad Bright League of Legends", descricao: "Tamanho grande (70x30 cm) com estampa temática. R$55,90" },
    { id: 7, nome: "Mouse Pad Bright Game Arme", descricao: "Superfície ampla (70x30 cm) com tema camuflado. R$55,90" },
    { id: 8, nome: "Mouse Pad Bright Ergonômico", descricao: "Superfície confortável com apoio de pulso. R$32,00" },

    // Mouses
    { id: 9, nome: "Mouse Gamer Acer Nitro NMW200", descricao: "Desempenho elevado para jogos. R$212,00" },
    { id: 10, nome: "Mouse Logitech Sem-Fio M185 AZUL", descricao: "Conforto e precisão sem fio. R$129,90" },
    { id: 11, nome: "Mouse Mini Logitech M187 Sem-Fio", descricao: "Mobilidade com tamanho compacto. R$81,90" },
    { id: 12, nome: "Mouse Multilaser Classic MO304 Rosa", descricao: "Design simples e funcional. R$19,90" },
    { id: 13, nome: "Mouse Multilaser Classic MO302 Branco", descricao: "Simples e prático para o dia a dia. R$19,90" },
    { id: 14, nome: "Mouse Sem Fio Logitech M170 Rosé", descricao: "Conectividade sem fio com estilo. R$129,90" },
    { id: 15, nome: "Mouse Sem Fio Logitech M170 Azul", descricao: "Compacto, sem fio e eficiente. R$129,90" },
    { id: 16, nome: "Mouse Sem Fio Logitech M240 Silent", descricao: "Cliques silenciosos e bateria duradoura. R$129,90" },
    { id: 17, nome: "Mouse Sem Fio Logitech M170 Branco", descricao: "Prático e leve para uso diário. R$129,90" },
    { id: 18, nome: "Mouse Bright 0462 Gaming Preto", descricao: "Design gamer acessível. R$49,20" },

    // Combos
    { id: 19, nome: "Combo Teclado e Mouse Sem Fio Bright", descricao: "Conectividade 2.4GHz sem fio com conforto. R$119,90" },
    { id: 20, nome: "Kit Gamer Kross Mouse + Teclado", descricao: "Combo gamer completo com 5 itens. R$199,99" },
    { id: 21, nome: "Combo Logitech Teclado e Mouse MK120", descricao: "Teclado e mouse com fio duráveis. R$149,90" },
    { id: 22, nome: "Teclado Logitech MK270 Sem Fio", descricao: "Teclado confiável e prático com mouse incluso. R$223,00" },

    // Fones e Headsets
    { id: 23, nome: "Headphone JBL Tune 500 Preto", descricao: "Som JBL Pure Bass com design dobrável. R$199,20" },
    { id: 24, nome: "Headset JBL Quantum 100", descricao: "Som envolvente com microfone destacável. R$237,42" },
    { id: 25, nome: "Headphone JBL Tune 520BT Bluetooth", descricao: "Fones sem fio com 57h de bateria. R$297,20" },
    { id: 26, nome: "Fone de Ouvido Bluetooth JBL TUNE 520BT Branco", descricao: "Som potente com estilo elegante. R$297,20" }
];

const busca = document.getElementById('input-busca');
const resultado = document.getElementById('resultado');

busca.addEventListener("input", () => {
    const termo = busca.value.toLowerCase();
    resultado.innerHTML = "";

    const filtrados = produtos.filter(p =>
        p.nome.toLowerCase().includes(termo)
    );

    filtrados.forEach(produto => {
        const div = document.createElement("div")
        div.className = "produto";
        div.innerText = `
        <h3>${produto.nome}</h3>
          <p>${produto.descricao}</p>
          `;
        resultado.appendChild(div);
    })
});