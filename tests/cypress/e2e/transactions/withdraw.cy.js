describe('withdraw', () => {
  beforeEach(() => {
    cy.clearDb();
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/register')
    cy.register("testUsername", "P@ssw0rd123", "P@ssw0rd123");
    cy.login("testUsername", "P@ssw0rd123");
  });

  it('successfull withdraw', () => {
    cy.get('[data-testid=withdraw-amount-input]').type("1");
    cy.get('[data-testid=withdraw-button]').click();
    cy.get('[data-testid=withdraw-error-message]').should('not.contain', "Insufficient balancce.");
  });

  it('failed withdraw', () => {
    cy.get('[data-testid=withdraw-amount-input]').type("500");
    cy.get('[data-testid=withdraw-button]').click();
    cy.get('[data-testid=withdraw-error-message]').should('contain', "Insufficient balance.");
  });
})