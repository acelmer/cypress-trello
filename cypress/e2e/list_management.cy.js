describe('List management',{defaultCommandTimeout: 9000, testIsolation: false }, () => {
    before(() => {
      cy.session('login', () => {
        cy.logIn();
      })
    });

it('should add a list to the board',() => {
    cy.apiCreateBoard('TeamBoard');
    cy.get('[data-testid="list-composer-button"]').click() // Add a list
    cy.get('[aria-label="Enter list title…"]').click().type('In progress'); //Type a list name
    cy.get('button').contains('Add list').click();
    cy.get('ol[data-testid="lists"]').find('li').should('have.length', 4); // Check if the list was added to the board
    cy.deleteBoard(); // Delete board
  });

it('should update a list name',() => {
  cy.apiCreateBoard('TeamBoard');
  cy.viewport(1400, 660); // Change the view size
  cy.get('[data-testid="list-composer-button"]').click() // Add a list
  cy.get('[aria-label="Enter list title…"]').click().type('In progress').type('{enter}'); //Type a list name
  cy.reload();
  cy.get('[data-testid="list-name-textarea"]').contains('In progress').click({force:true}).clear({force:true}).type('Tests', {force:true}).type('{enter}'); //Find a list and rename it
  cy.get('[data-testid="list-name-textarea"]').contains('Tests'); // Check if the list name was changed
  cy.deleteBoard(); // Delete board
  });
 

it('should archive and restore a list',() => {
  cy.apiCreateBoard('TeamBoard');
  cy.viewport(1400, 660); // Change the view size
  cy.get('[data-testid="list-composer-button"]').click();  // Add a list
  cy.get('[aria-label="Enter list title…"]').click().type('In progress').type('{enter}'); //Type a list name
  cy.reload();
  cy.xpath('//li[.//h2[text()="In progress"]]//button[@data-testid="list-edit-menu-button"]').click({force:true}); // Click on a list drop down menu
  cy.get('a').contains('Archive this list').click(); // Archive the list
  cy.get('[data-testid="list-name"]').contains('In progress'). should('not.exist'); // Check if the list was archived
  cy.xpath('//div[contains(@class,"board-header") and .//h1]//span[@data-testid="OverflowMenuHorizontalIcon"]').click({force:true}); // Click on the header menu
  cy.get('a.js-open-archive').click();
  cy.get('a').contains('Switch to lists').click();
  cy.xpath('//li[.//span[text()="In progress"]]//a[contains(@class,"js-reopen")]').click(); //Restore the list
  cy.get('a[title="Go back."]').click();
  cy.get('a.js-hide-sidebar').click(); // Hide the sidebar
  cy.deleteBoard(); // Delete board
});
});