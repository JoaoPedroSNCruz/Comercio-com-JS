import { catalogo } from "./utilidades";
import { adicionarAoCarrinho } from "./menuCarrinho";

export function renderizarCatalogo() {
    for(const produtoCatalogo of catalogo) {
        
        const cartaoProduto = 
        `<div class='group rounded-lg shadow-xl shadow-slate-400 m-2 w-48 flex flex-col p-2 justify-between' id="card-produto-${produtoCatalogo.id}">
        <img class='group-hover:scale-110 duration-300 my-3 rounded-lg' src="./assets/img/${produtoCatalogo.imagem}" alt="Produto ${produtoCatalogo.id} do Comércio com JS">
        <p class="text-sm">${produtoCatalogo.marca}</p>
        <p class='text-sm'>${produtoCatalogo.nome}</p>
        <p class='text-sm'>$${produtoCatalogo.preco}</p>
        <button id="adicionar-${produtoCatalogo.id}" class="bg-slate-900 hover:bg-slate-700 text-slate-200" ><i class="fa-solid fa-cart-plus"></i></button>
        </div>`;
        
        document.getElementById('container-produto').innerHTML += cartaoProduto;
    }

    for (const produtoCatalogo of catalogo) {
        document.getElementById(`adicionar-${produtoCatalogo.id}`).addEventListener('click', () => adicionarAoCarrinho(produtoCatalogo.id));
    }
};