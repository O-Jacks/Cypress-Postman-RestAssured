class ClientWebsitePage {

    get addToCartButton() {
        return cy.get('button').contains(/Add to ([a-zA-Z0-9])+/);
    }

    get productGrid() {
        return cy.get('[class~="grid"]');
    }

    get productGridAnchor() {
        return cy.get(`a[class^="grid"]`);
    }

    get productLinks() {
        return cy.get('[class*="cart"]').find('a[href*="/products"]')
    }
    
}

const clientWebsitePage = new ClientWebsitePage();
export default clientWebsitePage;
