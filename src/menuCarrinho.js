import { catalogo, salvarLocalStore, lerLocalStore } from "./utilidades";

const idsProdutoCarrinhoComQuantidade = lerLocalStore('carrinho') ?? {};

function abrirCarrinho() {
    document.getElementById("carrinho").classList.add("right-[0px]");
    document.getElementById("carrinho").classList.remove("right-[-360px]");
};

function fecharCarrinho() {
    document.getElementById("carrinho").classList.remove("right-[0px]");
    document.getElementById("carrinho").classList.add("right-[-360px]");
};

function irParaCheckout() {
    if(Object.keys(idsProdutoCarrinhoComQuantidade).length === 0) {
        return;
    }
    window.location.href = window.location.origin + "/checkout.html";
}

export function inicializarCarrinho() {
    const botaoFecharCarrinho = document.getElementById("fechar-carrinho");
    const botaoAbrirCarrinho = document.getElementById("abrir-carrinho");
    const botaoIrParaCheckout = document.getElementById("finalizar-compra")

    botaoFecharCarrinho.addEventListener('click', fecharCarrinho);
    botaoAbrirCarrinho.addEventListener('click', abrirCarrinho);
    botaoIrParaCheckout.addEventListener('click', irParaCheckout);
};

function removerDoCarrinho(idProduto) {
    delete idsProdutoCarrinhoComQuantidade[idProduto];
    salvarLocalStore('carrinho', idsProdutoCarrinhoComQuantidade);
    atualizarPrecoCarrinho();
    renderizarProdutosCarrinho();
};

function incrementarQuantidadeProduto(idProduto) {
    idsProdutoCarrinhoComQuantidade[idProduto]++;
    atualizarPrecoCarrinho();
    salvarLocalStore('carrinho', idsProdutoCarrinhoComQuantidade);
    atualizarInformacaoQuantidade(idProduto);
};

function decrementarQuantidadeProduto(idProduto) {
    if (idsProdutoCarrinhoComQuantidade[idProduto] === 1){
        removerDoCarrinho(idProduto);
        return;
    }
    idsProdutoCarrinhoComQuantidade[idProduto]--;
    salvarLocalStore('carrinho', idsProdutoCarrinhoComQuantidade);
    atualizarPrecoCarrinho();
    atualizarInformacaoQuantidade(idProduto);
};

function atualizarInformacaoQuantidade(idProduto){
    document.getElementById(`quantidade-${idProduto}`).innerText = idsProdutoCarrinhoComQuantidade[idProduto];
};

function desenharProdutoNoCarrinho(idProduto) {
    const produto = catalogo.find((p) => p.id === idProduto);
    const containerProdutosCarrinho = document.getElementById('produtos-carrinho');
    const elementoArticle = document.createElement("article");
    const articleClasses = ['flex', 'bg-slate-200', 'rounded-lg', 'p-1', 'relative'];
    
    for (const articleClass of articleClasses) {
        elementoArticle.classList.add(articleClass);
    };

    const cartaoProdutoCarrinho = `<button id="remover-item-${produto.id}" class="absolute top-0 right-2">
      <i class="fa-solid fa-circle-xmark text-slate-500 hover:text-slate-800"></i>
    </button>
    <img class="h-24 rounded-lg" src="./assets/img/${produto.imagem}" alt="Carrinho: ${produto.nome}">
    <div class="p-3 flex flex-col justify-between">
      <p class="text-slate-900 text-sm">${produto.nome}</p>
      <p class="text-slate-500 text-xs">Tamanho: M</p>
      <p class="text-green-700 text-lg">$${produto.preco}</p>
    </div>
    <div class="text-lg flex text-slate-900 items-end absolute bottom-0 right-2">
        <button id="decrementar-produto-${produto.id}">-</button>
        <p id="quantidade-${produto.id}" class="ml-2">${idsProdutoCarrinhoComQuantidade[produto.id]}</p>
        <button id="incrementar-produto-${produto.id}" class="ml-2">+</button>
    </div>`;

    elementoArticle.innerHTML = cartaoProdutoCarrinho;
  containerProdutosCarrinho.appendChild(elementoArticle);

  document.getElementById(`incrementar-produto-${produto.id}`).addEventListener('click', () => incrementarQuantidadeProduto(produto.id));
  document.getElementById(`decrementar-produto-${produto.id}`).addEventListener('click', () => decrementarQuantidadeProduto(produto.id));
  document.getElementById(`remover-item-${produto.id}`).addEventListener('click', () => removerDoCarrinho(produto.id));

};

export function renderizarProdutosCarrinho() {
    const containerProdutosCarrinho = document.getElementById('produtos-carrinho');
    containerProdutosCarrinho.innerHTML = "";

    for (const idProduto in idsProdutoCarrinhoComQuantidade) {
        desenharProdutoNoCarrinho(idProduto);
    };
};

export function adicionarAoCarrinho(idProduto) {
    if(idProduto in idsProdutoCarrinhoComQuantidade){
        incrementarQuantidadeProduto(idProduto);
        return;
    }
    idsProdutoCarrinhoComQuantidade[idProduto] = 1;
    salvarLocalStore('carrinho', idsProdutoCarrinhoComQuantidade);
    atualizarPrecoCarrinho()
    desenharProdutoNoCarrinho(idProduto);
};

function atualizarPrecoCarrinho() {
    const precoCarrinho = document.getElementById("preco-total");
    let precoTotalCarrinho = 0;
    for(const idProdutoNoCarrinho in idsProdutoCarrinhoComQuantidade) {
        precoTotalCarrinho +=
            catalogo.find((p) => p.id === idProdutoNoCarrinho).preco *
            idsProdutoCarrinhoComQuantidade[idProdutoNoCarrinho];
    }
    precoCarrinho.innerText =   `Total: $${precoTotalCarrinho}`;
}