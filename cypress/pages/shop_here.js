class ShopHerePage {
    get searchBar() {
        return cy.get(`input[type="search"]`);
    }

    get tiles() {
        return cy.get(`.tile-module--tile--1ZeJx`);
    }
    
}

const shopHerePage = new ShopHerePage();
export default shopHerePage;
