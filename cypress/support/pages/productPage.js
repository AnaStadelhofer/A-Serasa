class productPage {

    get table() {
        return cy.get('table tbody');
    }

    get firstRow() {
        return cy.get('table tbody tr').first();
    }

    get lastRow() {
        return cy.get('table tbody tr').last();
    }

    get filterInput() {
        return cy.get('.filter-textbox');
    }

    get confirmFilter() {
        return cy.get('[data-testid="filter-button"]');
    }

    get cancelFilter() {
        return cy.get('[data-testid="reset-filter-button"]');
    }

    get addProductButton() {
        return cy.get('[data-testid="add-a-product-button"]');
    }

    get showMoreButton() {
        return cy.get('[data-testid="show-more-button"]');
    }

    get productMessage() {
        return cy.get('.add-product-message');
    }

    // Interação com campos

    visit() {
        cy.visit('');
    }

    fillFilterInput(value) {
        this.filterInput.clear().type(value);
    }

    fillFilterInputAndConfirm(value) {
        this.fillFilterInput(value);
        this.confirmFilter.click();
    }

    clickAddProduct() {
        this.addProductButton.click();
    }

    clickShowMore() {
        this.showMoreButton.click();
    }

    resetFilter() {
        this.cancelFilter.click();
    }

    // Validações
    firstRowShouldContain({ name, price, date }) {
        this.firstRow.within(() => {
            cy.get('td').eq(0);
            cy.get('td').eq(1).should('contain', name);
            cy.get('td').eq(2).should('contain', price);
            cy.get('td').eq(3).should('contain', date);
        })
    }

    firstRowShouldNotContain({ name, price, date }) {
        this.firstRow.within(() => {
            cy.get('td').eq(0);
            cy.get('td').eq(1).should('not.contain', name);
            cy.get('td').eq(2).should('not.contain', price);
            cy.get('td').eq(3).should('not.contain', date);
        })
    }

    lastRowShouldContain({ name, price, date }) {
        this.lastRow.within(() => {
            cy.get('td').eq(0);
            cy.get('td').eq(1).should('contain', name);
            cy.get('td').eq(2).should('contain', price);
            cy.get('td').eq(3).should('contain', date);
        })
    }

    validateProductMessage(message) {
        this.productMessage.should('contain', message);
    }

    existTable() {
        this.table.should('exist');
    }

    dontExistTable() {
        this.table.should('not.exist');
    }

    shouldBeRedirectedAfterSubmit() {
        cy.url().should('include', '/add-product');
    }

}

export default new productPage()