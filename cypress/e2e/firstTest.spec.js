describe('template spec', () => {
  before(() => {
    cy.loginToApplication();
  });
  it('passes', () => {
    cy.log('We Logged In');
  });
});
