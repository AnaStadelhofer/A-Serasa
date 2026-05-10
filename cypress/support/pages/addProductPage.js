class addProductPage {

    //Campos
    get productNameInput() {
        return cy.get('[data-testid="product-textbox"]');
    }

    get priceInput() {
        return cy.get('[data-testid="price-textbox"]');
    }

    get dateStockedInput() {
        return cy.get('[data-testid="date-stocked"]');
    }

    get submitButton() {
        return cy.get('[data-testid="submit-form"]');
    }

    get cancelButton() {
        return cy.get('[data-testid="cancel-button"]');
    }

    // Mensagems de retorno
    get errorName() {
        return cy.get(':nth-child(1) > .error-message');
    }

    get errorPrice() {
        return cy.get('form > :nth-child(2) > .error-message');
    }

    get errorDateStocked() {
        return cy.get(':nth-child(3) > .error-message');
    }

    get errorRequired() {
        return cy.get('[data-testid="fillin-all-fields-validation"]');
    }

    get errorValidation() {
        return cy.get('[data-testid="all-fields-validation"]');
    }

    visit() {
        cy.visit("/add-product");
    }

    // Preencher campos
    fillProductName(name) {
        this.productNameInput.type(name);
    }

    fillPrice(price) {
        this.priceInput.type(price);
    }

    fillDateStocked(date) {
        this.dateStockedInput.type(date);
    }

    submit() {
        this.submitButton.click();
    }

    cancel() {
        this.cancelButton.click();
    }

    // Validar mensagens
    validateErrorName(message) {
        return this.errorName.should('be.visible').and('have.text', message);
    }

    validateErrorPrice(message) {
        return this.errorPrice.should('be.visible').and('have.text', message);
    }

    validateErrorDateStocked(message) {
        return this.errorDateStocked.should('be.visible').and('have.text', message);
    }

    validateErrorRequired(message) {
        return this.errorRequired.should('be.visible').and('have.text', message);
    }

    validateErrorValidation(message) {
        return this.errorValidation.should('be.visible').and('have.text', message);
    }

    // Metodos completos

    fillAllAndSubmit(name, price, date) {
        this.fillProductName(name);
        this.fillPrice(price);
        this.fillDateStocked(date);
        this.submit();
    }

    fillAllAndCancel(name, price, date) {
        this.fillProductName(name);
        this.fillPrice(price);
        this.fillDateStocked(date);
        this.cancel();
    }

    shouldBeRedirectedAfterSubmit() {
        cy.url().should('eq', `${Cypress.config().baseUrl}`);
    }
}

export default new addProductPage();
