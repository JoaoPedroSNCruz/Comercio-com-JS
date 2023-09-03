import { catalogo } from "./utilidades";

function abrirCarrinho() {
    document.getElementById("carrinho").classList.add("right-[0px]");
    document.getElementById("carrinho").classList.remove("right-[-360px]");
};

function fecharCarrinho() {
    document.getElementById("carrinho").classList.remove("right-[0px]");
    document.getElementById("carrinho").classList.add("right-[-360px]");
};

export function inicializarCarrinho() {
    const botaoFecharCarrinho = document.getElementById("fechar-carrinho");
    const botaoAbrirCarrinho = document.getElementById("abrir-carrinho");

    botaoFecharCarrinho.addEventListener('click', fecharCarrinho);
    botaoAbrirCarrinho.addEventListener('click', abrirCarrinho);
};

export function adicionarAoCarrinho(idProduto) {
    const produto = catalogo.find((p) => p.id === idProduto);
    const containerProdutosCarrinho = document.getElementById('produtos-carrinho');

    const cartaoProdutoCarrinho = `<article class="flex bg-slate-200 rounded-lg p-1 flex relative">
    <button id="fechar-carrinho" class="absolute top-0 right-2">
      <i class="fa-solid fa-circle-xmark text-slate-500 hover:text-slate-800"></i>
    </button>
    <img class="h-24 rounded-lg" src="./assets/img/${produto.imagem}" alt="Carrinho: ${produto.nome}">
    <div class="py-3">
      <p class="text-slate-900 text-sm">${produto.nome}ã</p>
      <p class="text-slate-500 text-xs">Tamanho: M</p>
      <p class="text-green-700 text-lg">$${produto.preco}</p>
    </div>
  </article>`;
  containerProdutosCarrinho.innerHTML += cartaoProdutoCarrinho;
};