import addProductPage from '../../support/pages/addProductPage';
import productPage from '../../support/pages/productPage';

describe("Testes da funcionalidade de produtos", () => {
    beforeEach(() => {
        productPage.visit();
    });

    it("Filtrar por um produto que não existe", () => {
        // Dado que o usuário está na página de produtos
        // Quando ele filtra por um produto que não existe
        // Então ele deve ver uma mensagem de que nenhum produto foi encontrado
        // E a tabela de produtos não deve aparecer

        productPage.fillFilterInputAndConfirm('Produto Inexistente');
        productPage.dontExistTable();
        productPage.validateProductMessage("No products found");
    })

    it("Filtrar por um produto existente", () => {
        // Dado que o usuário está na página de produtos
        // Quando ele filtra por um produto existente
        // Então ele deve ver a tabela de produtos
        // E a primeira linha da tabela deve conter as informações do produto filtrado 

        productPage.fillFilterInputAndConfirm('Product 1');
        productPage.firstRowShouldContain({
            name: 'Product 1',
            price: '10',
            date: '2021-01-01'
        });
    })

    it("Filtrar por um produto e resetar o filtro", () => {
        // Dado que o usuário está na página de produtos
        // Quando ele filtra por um produto existente
        // E ele reseta o filtro
        // Então ele deve ver a tabela de produtos com todos os produtos

        productPage.fillFilterInputAndConfirm('Product 1');
        productPage.firstRowShouldContain({
            name: 'Product 1',
            price: '10',
            date: '2021-01-01'
        });
        productPage.resetFilter();
    })

    it("Clicar em adicionar produto pelo botão abaixo da tabela", () => {
        // Dado que o usuário está na página de produtos
        // Quando ele clicar em adicionar produto
        // Então ele deve ser redirecionado para a página de adicionar produto

        productPage.clickAddProduct();
        productPage.shouldBeRedirectedAfterSubmit();
        addProductPage.validateTitle("Add Product");
    })

    it("Clicar em mostrar mais produtos", () => {
        // Dado que o usuário está na página de produtos
        // Quando ele clicar em mostrar mais produtos
        // Então ele deve ver mais produtos na tabela

        productPage.clickShowMore();
        productPage.existTable();

        productPage.lastRowShouldContain({
            name: 'Product 1',
            price: '10',
            date: '2021-01-01'
        });
    })
})
