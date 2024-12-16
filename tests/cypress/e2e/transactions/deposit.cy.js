
describe('deposit', () => {
  beforeEach(() => {
    cy.clearDb();
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/register')
    cy.register("testUsername", "P@ssw0rd123", "P@ssw0rd123");
    cy.login("testUsername", "P@ssw0rd123");
  });

  it('successfull deposit', () => {
    cy.get('[data-testid=deposit-amount-input]').type("300");
    cy.get('[data-testid=deposit-button]').click();
    cy.get('[data-testid=deposit-error-message]').should('not.contain', "Insufficient cash.");
  });

  it('successfull deposit', () => {
    cy.get('[data-testid=deposit-amount-input]').type("500");
    cy.get('[data-testid=deposit-button]').click();
    cy.get('[data-testid=deposit-error-message]').should('contain', "Insufficient cash.");
  });
})
