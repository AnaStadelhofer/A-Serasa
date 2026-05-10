import addProductPage from '../../support/pages/addProductPage';
import productPage from '../../support/pages/productPage';

describe("Testes da funcionalidade de produtos", () => {
    beforeEach(() => {
        addProductPage.visit();
    });

    it("Criar produto com sucesso", () => {
        // Dado que o usuário acesse a tela de criar produto do site jsonplaceholder.typicode.com
        // Quando preenchido todos os campos com dados válidos
        // E clicado para enviar
        // Então deve redirecionar para a tela de listagem de produtos 
        // E o produto deve ser exibido na grid

        addProductPage.fillAllAndSubmit("Produto Teste", "100", "2025-10-10");
        addProductPage.shouldBeRedirectedAfterSubmit();

        productPage.firstRowShouldContain({
            name: "Produto Teste",
            price: "100",
            date: "2025-10-10"
        });
    });

    it("Criar produto onde o preço tem mais de 10 dígitos", () => {
        // Dado que o usuário acesse a tela de criar produto do site jsonplaceholder.typicode.com
        // Quando preenchido todos campos válidos, mas o preço tem mais de 10 dígitos
        // E clicado para enviar
        // Então deve aparecer uma mensagem de erro informando que o preço deve conter no máximo 10 dígitos
        // E deve aparecer uma mensagem de erro informando que os erros devem ser resolvidos antes de enviar

        addProductPage.fillAllAndSubmit("Produto Teste", "12345678901", "2025-10-10");
        addProductPage.validateErrorPrice("Price must not be empty and within 10 digits");
        addProductPage.validateErrorValidation("Errors must be resolved before submitting");
    });

    it("Criar produto e cancelar a criação", () => {
        // Dado que o usuário acesse a tela de criar produto do site jsonplaceholder.typicode.com
        // Quando preenchido todos os campos com dados válidos
        // E clicado para cancelar
        // Então deve redirecionar para a tela de listagem de produtos 
        // E o produto deve não ser exibido na grid

        addProductPage.fillAllAndCancel("Produto Teste", "100", "2025-10-10");
        addProductPage.shouldBeRedirectedAfterSubmit();
        productPage.firstRowShouldNotContain({
            name: "Produto Teste",
            price: "100",
            date: "2025-10-10"
        });
    })

    it("Criar produto produto com todos campos vazios", () => {
        // Dado que o usuário acesse a tela de criar produto do site jsonplaceholder.typicode.com
        // Quando clicado para enviar sem preencher nenhum campo
        // Então deve aparecer uma mensagem de erro informando que os erros devem ser resolvidos antes de enviar
        // E o campo nome deve apresentar uma mensagem de erro informando que o nome deve conter no mínimo 2 caracteres
        // E o campo preço deve apresentar uma mensagem de erro informando que o preço deve conter no máximo 10 dígitos
        // E o campo data deve apresentar uma mensagem de erro informando que a data não pode ser vazia

        addProductPage.submit();
        addProductPage.validateErrorRequired("Please fill in all fields");
        addProductPage.validateErrorName("Name must be at least 2 characters.");
        addProductPage.validateErrorPrice("Price must not be empty and within 10 digits");
        addProductPage.validateErrorDateStocked("Date must not be empty.");
        addProductPage.validateErrorValidation("Errors must be resolved before submitting");
    });

    it("Criar produto com nome muito grande, com mais de 1000 caracteres", () => {
        // Dado que o usuário acesse a tela de criar produto do site jsonplaceholder.typicode.com
        // Quando preenchido todos os campos válidos, mas o nome tem mais de 500 caracteres
        // E clicado para enviar
        // Então deve redirecionar para a tela de listagem de produtos
        // E o produto deve ser exibido na grid

        const longName = 'A'.repeat(501);
        addProductPage.fillAllAndSubmit(longName, "100", "2025-10-10");

        addProductPage.shouldBeRedirectedAfterSubmit();

        productPage.firstRowShouldContain({
            name: longName,
            price: "100",
            date: "2025-10-10"
        });
    });

});