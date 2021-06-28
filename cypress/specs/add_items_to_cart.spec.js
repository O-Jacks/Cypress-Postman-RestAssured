import clientWebsitePage from '../pages/client_website';
import shopHerePage from '../pages/shop_here';
import ShopHerePage from '../pages/shop_here';


before(() => {
    cy.visit(Cypress.env('baseUrl'), { failOnStatusCode: false })
});


describe('Add items to cart', () => {
    it('Search with keyword "Heart of Oxford" and click on first listing', () => {
        //Using force:true here cause of a stray svg element appearing on page
        shopHerePage.searchBar.click({ force: true }).type('Heart of Oxford');
        cy.intercept(Cypress.env('getTilesRequest')).as('getShopTiles');
        cy.wait('@getShopTiles');
        shopHerePage.tiles.then(($tiles) => {
            expect($tiles).to.have.lengthOf.above(2)
            cy.get($tiles).first().should('have.attr', 'target', '_blank');
            cy.request($tiles.prop('href')).its('status').should('eq', 200);
            cy.get($tiles).first().invoke('removeAttr', 'target').click();
        });
    });


    it('Add first two products to cart', () => {
        clientWebsitePage.productGrid.within(($x) => {
            clientWebsitePage.productGridAnchor.eq(0).click();
        });
        //click on any button starting with 'Add to'
        clientWebsitePage.addToCartButton.click({ force: true });

        //go back to product list
        cy.go(-1);
        clientWebsitePage.productGrid.within(() => {
            clientWebsitePage.productGridAnchor.eq(1).click({ force: true });
        });
        clientWebsitePage.addToCartButton.click();
        clientWebsitePage.productLinks.should('have.length', 2);

    });
});