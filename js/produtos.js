const produtos = [
    { id: 1, nome: "Notebook Dell i5", descricao: "8GB RAM, SSD 256GB" },
    { id: 2, nome: "Notebook Acer i7", descricao: "16GB RAM, SSD 512GB" },
    { id: 3, nome: "Notebook Lenovo Ryzen 5", descricao: "8GB RAM, SSD 1TB" }
];

const busca = document.getElementById('busca')
const resultado = document.getElementById('resultado')


busca.addEventListener("input"() => {
    const termo = busca.value.toLowerCase();
    resultado.innerHTML = "";

    const filtrados = produtos.filter(p =>
        p.nome.toLowerCase().includes(termo)
    );

    filtrados.forEach(produto => {
        const div = document.createElement("div")
        div.className("produto")
        div.innerText = ``
    })

});