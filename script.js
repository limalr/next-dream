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

  const area = document.getElementById("listaProdutos");

  if (!area) {
    return;
  }

  if (lista.length === 0) {

    area.innerHTML = `
      <div class="nenhum-produto">
        NENHUM PRODUTO ENCONTRADO.
      </div>
    `;

    return;
  }


  area.innerHTML = lista.map(produto => {

    return `
      <article class="produto">

        <div class="produto-imagem"></div>

        <div class="produto-info">

          <h3>
            ${produto.nome}
          </h3>

          <div class="produto-preco">
            ${formatarPreco(produto.preco)}
          </div>

          <div class="produto-tamanhos">
            TAMANHOS: P / M / G / GG
          </div>

          <button
            class="btn-produto"
            onclick="adicionarCarrinho(${produto.id})">
            ADICIONAR AO CARRINHO
          </button>

        </div>

      </article>
    `;

  }).join("");
}


function filtrar(categoria) {

  const botoes = document.querySelectorAll(".categorias button");

  botoes.forEach(botao => {
    botao.classList.remove("ativo");
  });


  const botaoSelecionado = [...botoes].find(botao => {

    const texto = botao.textContent
      .trim()
      .toLowerCase();

    if (categoria === "todos") {
      return texto === "todos";
    }

    if (categoria === "camisetas") {
      return texto === "camisetas";
    }

    if (categoria === "agasalhos") {
      return texto === "agasalhos";
    }

    if (categoria === "calcas") {
      return texto === "calças & shorts";
    }

    if (categoria === "outros") {
      return texto === "outros";
    }

    return false;
  });


  if (botaoSelecionado) {
    botaoSelecionado.classList.add("ativo");
  }


  if (categoria === "todos") {
    mostrarProdutos(produtos);
    return;
  }


  const produtosFiltrados = produtos.filter(produto => {

    return produto.categoria === categoria;

  });


  mostrarProdutos(produtosFiltrados);
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

  const area = document.getElementById("itensCarrinho");

  const total = document.getElementById("total");

  const contador = document.getElementById("contadorCarrinho");


  if (!area || !total) {
    return;
  }


  if (contador) {
    contador.textContent = carrinho.length;
  }


  if (carrinho.length === 0) {

    area.innerHTML = `
      <div class="carrinho-vazio">
        SEU CARRINHO ESTÁ VAZIO.
      </div>
    `;

    total.textContent = "R$ 0,00";

    return;
  }


  area.innerHTML = carrinho.map((produto, index) => {

    return `
      <div class="item-carrinho">

        <div>

          <h4>
            ${produto.nome}
          </h4>

          <div class="item-preco">
            ${formatarPreco(produto.preco)}
          </div>

        </div>

        <button
          class="remover-item"
          onclick="removerCarrinho(${index})"
          aria-label="Remover produto">
          ×
        </button>

      </div>
    `;

  }).join("");


  const valorTotal = carrinho.reduce(
    (total, produto) => total + produto.preco,
    0
  );


  total.textContent = formatarPreco(valorTotal);
}


function abrirCarrinho() {

  const carrinhoElemento = document.getElementById("carrinho");

  if (carrinhoElemento) {
    carrinhoElemento.classList.add("aberto");
  }
}


function fecharCarrinho() {

  const carrinhoElemento = document.getElementById("carrinho");

  if (carrinhoElemento) {
    carrinhoElemento.classList.remove("aberto");
  }
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
