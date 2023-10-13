import { desenharProdutoNoCarrinhoSimples, lerLocalStore } from "./src/utilidades";

function desenharProdutosCheckout() {
    const idsProdutoCarrinhoComQuantidade = lerLocalStore('carrinho');
    for(const idProduto in idsProdutoCarrinhoComQuantidade) {
        desenharProdutoNoCarrinhoSimples(idProduto, "container-produtos-checkout", idsProdutoCarrinhoComQuantidade[idProduto]);
    }
}

desenharProdutosCheckout();