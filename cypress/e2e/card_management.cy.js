describe('List management',{defaultCommandTimeout: 9000, testIsolation: false }, () => {
    before(() => {
      cy.session('login', () => {
        cy.logIn();
      })
    });

it('should add a card to the list',() => {
    cy.apiCreateBoard('TeamBoard');
    cy.viewport(1400, 660); // Change the view size
    cy.xpath('//li[.//textarea[@aria-label="To Do"]]//button[@data-testid="list-add-card-button"]').click(); // Click on a button to add the card
    cy.get('textarea[placeholder="Enter a title for this card…"]').type("Budget Approval").type('{enter}'); // Type a card name 
    cy.xpath('//button[text()="Add card"]').click(); // Create a card
    cy.deleteBoard(); // Delete board
  });


it('should update a card name',() => {
  cy.apiCreateBoard('TeamBoard');
  cy.xpath('//li[.//textarea[@aria-label="To Do"]]//button[@data-testid="list-add-card-button"]').click(); // Click on a button to add the card
  cy.get('textarea[placeholder="Enter a title for this card…"]').type("Budget Approval").type('{enter}'); // Type a card name 
  cy.xpath('//button[text()="Add card"]').click(); // Create a card
  cy.xpath('//li[.//h2[text()="To Do"]]//ol/li').click({force: true}); // Click on a card to change
  cy.get('textarea.js-card-detail-title-input').should('be.visible');
  cy.get('textarea.js-card-detail-title-input').click().focused().clear().type("Capex Approval").type('{enter}'); // Type a new card name
  cy.get('a.js-close-window').click(); 
  cy.get('a').contains('Capex Approval').should('exist'); // Check if the card name was updated
  cy.deleteBoard(); // Delete board
});

it('should archive and restore a card',() => {
  cy.apiCreateBoard('TeamBoard');
  cy.viewport(1400, 660); // Change the view size
  cy.xpath('//li[.//textarea[@aria-label="To Do"]]//button[@data-testid="list-add-card-button"]').click(); // Click on a button to add the card
  cy.get('textarea[placeholder="Enter a title for this card…"]').type("Budget Approval").type('{enter}'); // Type a card name 
  cy.xpath('//button[text()="Add card"]').click(); // Create a card
  cy.get('a').contains('Budget Approval').click({force:true}).wait(3000);
  cy.get('span').contains('Archive').click(); // Click on archive button
  cy.get('a[aria-label="Close dialog"]').click(); // Close the pop up window
  cy.xpath('//div[contains(@class,"board-header") and .//h1]//span[@data-testid="OverflowMenuHorizontalIcon"]').click({force:true}); // Click on the header menu
  cy.get('a.js-open-archive').click();
  cy.xpath('//div//a[text()="Send to board"]').click(); // Restore a card
  cy.get('a[title="Go back."]').click();
  cy.get('a[title="Close the board menu."]').click(); // Hide the sidebar
  cy.deleteBoard(); // Delete board
});


it('should add a label to a card',() => {
  cy.apiCreateBoard('TeamBoard');
  cy.viewport(1400, 660); // Change the view size
  cy.xpath('//li[.//textarea[@aria-label="To Do"]]//button[@data-testid="list-add-card-button"]').click(); // Click on a button to add the card
  cy.get('textarea[placeholder="Enter a title for this card…"]').type("Budget Approval").type('{enter}'); // Type a card name 
  cy.xpath('//button[text()="Add card"]').click(); // Create a card
  cy.get('a').contains('Budget Approval').click({force:true}).wait(3000);
  cy.get('span').contains('Labels').click();
  cy.get('button').contains('Create a new label').click(); // Click on a button to add a label
  cy.xpath('//section//input[@type="text"]').click().type('Urgent'); // Type a label name
  cy.xpath('//section//button[text()="Create"]').click(); // Create label
  cy.get('button[data-testid="popover-close"]').click(); // Close pop up window
  cy.get('span').contains('Urgent').should('exist'); // Check if the label was created
  cy.get('a[aria-label="Close dialog"]').click(); // Close dialog
  cy.deleteBoard(); // Delete board
});
  
});


