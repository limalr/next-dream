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


/* =========================
   PRODUTOS
========================= */

function mostrarProdutos(lista = produtos) {

  const area = document.getElementById("listaProdutos");

  if (!area) return;

  area.innerHTML = "";

  lista.forEach(function(produto) {

    area.innerHTML += `

      <div class="produto">

        <div class="produto-imagem"></div>

        <div class="produto-info">

          <h3>${produto.nome}</h3>

          <div class="preco">
            R$ ${produto.preco.toFixed(2).replace(".", ",")}
          </div>

          <div class="tamanhos">
            <button>P</button>
            <button>M</button>
            <button>G</button>
            <button>GG</button>
          </div>

          <button
            class="adicionar"
            onclick="adicionarCarrinho(${produto.id})"
          >
            ADICIONAR AO CARRINHO
          </button>

        </div>

      </div>

    `;

  });

}


/* =========================
   FILTROS
========================= */

function filtrar(categoria) {

  if (categoria === "todos") {

    mostrarProdutos(produtos);

    return;

  }

  const resultado = produtos.filter(function(produto) {

    return produto.categoria === categoria;

  });

  mostrarProdutos(resultado);

}


/* =========================
   CARRINHO
========================= */

function adicionarCarrinho(id) {

  const produto = produtos.find(function(item) {

    return item.id === id;

  });

  if (!produto) return;

  carrinho.push(produto);

  atualizarCarrinho();

  abrirCarrinho();

}


function atualizarCarrinho() {

  const contador =
    document.getElementById("contador");

  const itens =
    document.getElementById("itensCarrinho");

  const total =
    document.getElementById("total");


  if (contador) {

    contador.textContent = carrinho.length;

  }


  if (!itens || !total) return;


  if (carrinho.length === 0) {

    itens.innerHTML =
      "<p style='color:#777'>Seu carrinho está vazio.</p>";

    total.textContent = "R$ 0,00";

    return;

  }


  let valorTotal = 0;

  itens.innerHTML = "";


  carrinho.forEach(function(produto, index) {

    valorTotal += produto.preco;

    itens.innerHTML += `

      <div style="
        padding:15px 0;
        border-bottom:1px solid #222;
        display:flex;
        justify-content:space-between;
        gap:10px;
      ">

        <div>

          <strong>
            ${produto.nome}
          </strong>

          <div style="
            color:#a6ff00;
            margin-top:5px;
          ">

            R$ ${produto.preco
              .toFixed(2)
              .replace(".", ",")}

          </div>

        </div>

        <button
          onclick="removerCarrinho(${index})"
          style="
            background:none;
            border:0;
            color:#777;
            font-size:22px;
          "
        >
          ×
        </button>

      </div>

    `;

  });


  total.textContent =
    "R$ " +
    valorTotal
      .toFixed(2)
      .replace(".", ",");

}


function removerCarrinho(index) {

  carrinho.splice(index, 1);

  atualizarCarrinho();

}


/* =========================
   ABRIR / FECHAR CARRINHO
========================= */

function abrirCarrinho() {

  const carrinhoBox =
    document.getElementById("carrinho");

  const fundo =
    document.getElementById("fundo");


  if (carrinhoBox) {

    carrinhoBox.classList.add("aberto");

  }


  if (fundo) {

    fundo.classList.add("aberto");

  }

}


function fecharCarrinho() {

  const carrinhoBox =
    document.getElementById("carrinho");

  const fundo =
    document.getElementById("fundo");


  if (carrinhoBox) {

    carrinhoBox.classList.remove("aberto");

  }


  if (fundo) {

    fundo.classList.remove("aberto");

  }

}


/* =========================
   FINALIZAR
========================= */

function finalizar() {

  if (carrinho.length === 0) {

    alert("Seu carrinho está vazio.");

    return;

  }

  window.location.href = "login.html";

}


/* =========================
   INICIAR SITE
========================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    mostrarProdutos();

    atualizarCarrinho();

  }
);
