const produtos = [
  {
    id: 1,
    nome: "Camiseta Next Dream Essential",
    preco: 89.90,
    categoria: "camisetas"
  },
  {
    id: 2,
    nome: "Moletom Next Dream",
    preco: 169.90,
    categoria: "agasalhos"
  },
  {
    id: 3,
    nome: "Shorts Esportivo Next Dream",
    preco: 99.90,
    categoria: "calcas"
  },
  {
    id: 4,
    nome: "Calça Jogger Next Dream",
    preco: 149.90,
    categoria: "calcas"
  }
];


let carrinho = [];


function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}


function mostrarProdutos(lista = produtos) {

  const container = document.getElementById("listaProdutos");
  const quantidade = document.getElementById("quantidadeProdutos");

  if (!container) {
    return;
  }

  quantidade.textContent = `${lista.length} produtos`;

  if (lista.length === 0) {

    container.innerHTML = `
      <div class="nenhum-produto">
        Nenhum produto encontrado.
      </div>
    `;

    return;
  }

  container.innerHTML = lista.map(produto => {

    return `
      <article class="produto">

        <div class="produto-imagem"></div>

        <div class="produto-info">

          <h3>${produto.nome}</h3>

          <div class="produto-preco">
            ${formatarPreco(produto.preco)}
          </div>

          <div class="produto-tamanhos">
            P &nbsp; M &nbsp; G &nbsp; GG
          </div>

          <button
            class="btn-produto"
            onclick="adicionarCarrinho(${produto.id})"
          >
            ADICIONAR AO CARRINHO
          </button>

        </div>

      </article>
    `;

  }).join("");
}


function filtrar(categoria, botao) {

  document
    .querySelectorAll(".categorias button")
    .forEach(button => {
      button.classList.remove("ativo");
    });

  if (botao) {
    botao.classList.add("ativo");
  }

  if (categoria === "todos") {
    mostrarProdutos(produtos);
    return;
  }

  const filtrados = produtos.filter(produto => {
    return produto.categoria === categoria;
  });

  mostrarProdutos(filtrados);
}


function adicionarCarrinho(id) {

  const produto = produtos.find(item => item.id === id);

  if (!produto) {
    return;
  }

  carrinho.push(produto);

  atualizarCarrinho();
  abrirCarrinho();
}


function removerCarrinho(index) {

  carrinho.splice(index, 1);

  atualizarCarrinho();
}


function atualizarCarrinho() {

  const container = document.getElementById("itensCarrinho");
  const totalElement = document.getElementById("total");
  const contador = document.getElementById("contadorCarrinho");

  contador.textContent = carrinho.length;

  if (carrinho.length === 0) {

    container.innerHTML = `
      <div class="carrinho-vazio">
        Seu carrinho está vazio.
      </div>
    `;

    totalElement.textContent = "R$ 0,00";

    return;
  }


  container.innerHTML = carrinho.map((produto, index) => {

    return `
      <div class="item-carrinho">

        <div>
          <h4>${produto.nome}</h4>

          <span class="item-preco">
            ${formatarPreco(produto.preco)}
          </span>
        </div>

        <button
          class="remover-item"
          onclick="removerCarrinho(${index})"
        >
          ×
        </button>

      </div>
    `;

  }).join("");


  const total = carrinho.reduce(
    (soma, produto) => soma + produto.preco,
    0
  );

  totalElement.textContent = formatarPreco(total);
}


function abrirCarrinho() {

  const carrinhoElement = document.getElementById("carrinho");

  carrinhoElement.classList.add("aberto");
}


function fecharCarrinho() {

  const carrinhoElement = document.getElementById("carrinho");

  carrinhoElement.classList.remove("aberto");
}


function finalizar() {

  if (carrinho.length === 0) {

    alert("Seu carrinho está vazio.");

    return;
  }

  window.location.href = "login.html";
}


document.addEventListener("DOMContentLoaded", () => {

  mostrarProdutos();

  atualizarCarrinho();

});
