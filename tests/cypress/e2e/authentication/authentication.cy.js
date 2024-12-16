
describe('authentication', () => {
  beforeEach(() => {
    cy.clearDb();
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/')
  });

  it('successfull login flow', () => {
    cy.get('[data-testid=link-register]').click();
    cy.register("testUsername", "P@ssw0rd123", "P@ssw0rd123");
    cy.login("testUsername", "P@ssw0rd123");
    cy.logout();

    cy.url().should('include', '/login');
  })

  it('login with wrong credentials', () => {
    cy.login("testUsername", "wrong_password");
    cy.get('.error-message').should('contain', 'Invalid credentials.');
  })

  it('register with short password', () => {
    cy.get('[data-testid=link-register]').click();
    cy.register("testUsername", "short", "short");
    cy.get('[data-testid=password-field-error]').should('contain', 'Must have at least 8 characters')
  })

  it('register with weak password', () => {
    cy.get('[data-testid=link-register]').click();
    cy.register("testUsername", "weakweak", "weakweak");
    cy.get('.error-message').should('contain',
        'A password must includes at least 8 characters, uppercase letters, lowercase letters, numbers, and special characters.')
  })
})
