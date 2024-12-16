
Cypress.Commands.add('register', (username, password, confirm_password) => {
    cy.get('input[name=username]').type(username);
    cy.get('input[name=password]').type(password);
    cy.get('input[name=confirmPassword]').type(confirm_password);
    cy.get('button[type=submit]').click();
})

Cypress.Commands.add('login', (username, password) => {
    cy.get('input[name=username]').type(username);
    cy.get('input[name=password]').type(password);
    cy.get('button[type=submit]').click();
})

Cypress.Commands.add('logout', () => {
    cy.get('[data-testid=logout-button]').click();
})

Cypress.Commands.add('queryDb', (query, params) => {
    cy.task('queryDb', {query, params});
});

Cypress.Commands.add('clearDb', () => {
    cy.task('queryDb',{query: "Delete From transactions", params:[]});
    cy.task('queryDb', {query: "Delete From users WHERE username!='secBankAdmin'", params:[]});
})