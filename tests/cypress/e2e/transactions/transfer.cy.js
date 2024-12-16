describe('transfer', () => {
  let account_id;
  beforeEach(() => {
    cy.clearDb();
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/register')
    cy.register("testUsername", "P@ssw0rd123", "P@ssw0rd123");
    cy.login("testUsername", "P@ssw0rd123");

    cy.get('div[data-rowindex=0] div[data-colindex=1]').invoke('text').then((text) => {
        account_id = text
       cy.log('Div Text:', text);
    })
  });

  it('successfull transfer', () => {
    cy.get('[data-testid=account-input]').type(account_id);
    cy.get('[data-testid=description-input]').type("test");
    cy.get('[data-testid=transfer-amount-input]').type("1");
    cy.get('[data-testid=transfer-button]').click();
    cy.get('[data-testid=transfer-error-message]').should('not.contain', "Insufficient balance.");
  });

  it('failed transfer', () => {
    cy.get('[data-testid=account-input]').type(account_id);
    cy.get('[data-testid=description-input]').type("test");
    cy.get('[data-testid=transfer-amount-input]').type("1");
    cy.get('[data-testid=transfer-amount-input]').type("500");
    cy.get('[data-testid=transfer-button]').click();
    cy.get('[data-testid=transfer-error-message]').should('contain', "Insufficient balance.");
  });
})