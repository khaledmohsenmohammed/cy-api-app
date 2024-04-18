describe('template spec', () => {
  before(() => {
    cy.loginToApplication();
  });
  it('verify correct requst and resonse', () => {
    cy.intercept(
      'post',
      'https://conduit-api.bondaracademy.com/api/articles/'
    ).as('postArticles');
    cy.contains('New Article').click();
    cy.get('[formcontrolname="title"]').type('this is the new title (01)');
    cy.get('[formcontrolname="description"]').type(
      'this is the new description (01)'
    );
    cy.get('[formcontrolname="body"]').type('this is the new body (01)');
    cy.contains('Publish Article').click();
    cy.wait('@postArticles').then((xhr) => {
      console.log(xhr);
      expect(xhr.response.statusCode).to.equal(201);
      expect(xhr.response.body.article.title).to.equal(
        'this is the new title (01)'
      );
      exspect(xhr.response.body.article.description).to.equal(
        'this is the new description (01)'
      );
    });
    cy.contains('Delete Article').click();
  });
});
