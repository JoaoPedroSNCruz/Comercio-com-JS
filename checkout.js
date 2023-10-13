import { apagarDoLocalStorage, desenharProdutoNoCarrinhoSimples, lerLocalStore, salvarLocalStore } from "./src/utilidades";

function desenharProdutosCheckout() {
    const idsProdutoCarrinhoComQuantidade = lerLocalStore('carrinho') ?? {};
    for(const idProduto in idsProdutoCarrinhoComQuantidade) {
        desenharProdutoNoCarrinhoSimples(idProduto, "container-produtos-checkout", idsProdutoCarrinhoComQuantidade[idProduto]);
    }
}

function finalizarCompra(e) {
    e.preventDefault();
    const idsProdutoCarrinhoComQuantidade = lerLocalStore('carrinho') ?? {};
    if(Object.keys(idsProdutoCarrinhoComQuantidade).length === 0) {
        return;
    }

    const dataAtual = new Date();
    const pedidoFeito = {
        dataPedido: dataAtual,
        pedido: idsProdutoCarrinhoComQuantidade
    }
    const historicoDePedidos = lerLocalStore('historico') ?? [];
    const historicoDePedidosAtualizado = [pedidoFeito, ...historicoDePedidos];
    salvarLocalStore('historico', historicoDePedidosAtualizado);

    apagarDoLocalStorage('carrinho');
    window.location.href = './pedidos.html';
}

desenharProdutosCheckout();

document.addEventListener('submit', (evento) => finalizarCompra(evento));