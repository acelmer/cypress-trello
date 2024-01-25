// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('logIn', () => {
    cy.visit('/home');
    cy.get('a').contains('Log in').click()
    cy.origin('https://id.atlassian.com/', () => {
      cy.get('#username').type(Cypress.env('TRELLO_USERNAME'));
      cy.get('#login-submit').click();
      cy.get('#password').type(Cypress.env('TRELLO_PASSWORD'));
      cy.get('#login-submit').click();
    });
    cy.location('pathname').should('equal', '/u/aleksandracelmer/boards');
});

Cypress.Commands.add('apiCreateBoard', (boardName) => {
  cy.visit('/');
  cy.request({
    method: 'POST',
    url: 'https://api.trello.com/1/boards/?name=' + boardName + '&key=' + Cypress.env('TRELLO_API_KEY')+ '&token=' + Cypress.env('TRELLO_API_TOKEN')
  }).then(res => {
    expect(res.status).to.eq(200);
 });
  cy.get('li').contains("TeamBoard").click();

});

Cypress.Commands.add('deleteBoard', () => {
  cy.xpath('//div[contains(@class,"board-header") and .//h1]//span[@data-testid="OverflowMenuHorizontalIcon"]').click({force:true});
  cy.get('a.js-close-board').click({force:true});
  cy.get('input[value="Close"]').click({force:true});
  cy.get('button').contains('Permanently delete board').click();
  cy.get('button').contains('Delete').click();
});