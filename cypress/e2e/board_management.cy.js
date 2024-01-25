describe('Board management',{defaultCommandTimeout: 9000, testIsolation: false }, () => {
  before(() => {
    cy.session('login', () => {
      cy.logIn();
    })
  });

  it('should create and delete board', () => {
    cy.visit('/');
    cy.get('li[data-testid="create-board-tile"]').click(); // Find button "Create new board"
    cy.get('input[data-testid="create-board-title-input"]').type('TeamBoard'); // Insert a board name
    cy.xpath('//form[.//div[text()="Workspace"]]//input[@aria-autocomplete="list"]').click({force:true}).type('{upArrow}{enter}',{force:true}); // Set the board visibility
    cy.xpath('//section[//h2[@title="Create board"]]//button[@data-testid="create-board-submit-button"]').click();
    cy.get('li').contains("TeamBoard").should('exist'); // Check if the board was created
    cy.get('li').contains("TeamBoard").click();
    cy.deleteBoard(); // Delete board
  });

  it('should update a board name',() => {
    cy.apiCreateBoard('TeamBoard');
    cy.get('[data-testid="board-name-display"]').contains('TeamBoard').click().focused().clear().type('Manager Board', {force:true}).type('{enter}'); // Type a new board name
    cy.get('[data-testid="board-name-display"]').contains('Manager Board'); // Check if the name was updated
    cy.deleteBoard(); // Delete board
  });

  it('should archive and restore a board',() => {
    cy.apiCreateBoard('TeamBoard');
    cy.xpath('//div[contains(@class,"board-header") and .//h1]//span[@data-testid="OverflowMenuHorizontalIcon"]').click({force:true}); // Click on the header menu
    cy.get('a.js-close-board').click({force:true});
    cy.get('input[value="Close"]').click({force:true}); // Archive the board
    cy.visit('/'); // Visit home page
    cy.get('button').contains('View all closed boards').click(); // View archived boards
    cy.get('button').contains('Reopen').click();
    cy.get('button').contains('Reopen board').click(); // Restore the board
    cy.xpath('//header[.//h2[text()="Closed boards"]]//span[@data-testid="CloseIcon"]').click();
    cy.get('li').contains("TeamBoard").should('exist'); // Check if the board was restored
    cy.get('li').contains("TeamBoard").click();
    cy.deleteBoard(); // Delete board
  });
  });
