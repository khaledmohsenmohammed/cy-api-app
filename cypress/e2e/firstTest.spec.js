describe('template spec', () => {
  before(() => {
    //this for mokup the response
    cy.intercept('GET', 'https://conduit-api.bondaracademy.com/api/tags', {
      fixture: 'tags.json',
    });
    //for login to the application using the custom command
    cy.loginToApplication();
  });
  it('verify correct requst and resonse', () => {
    //this for intercept the request and response
    cy.intercept(
      'post',
      'https://conduit-api.bondaracademy.com/api/articles/'
    ).as('postArticles');

    //this the steps of the test case to create new article and call the api to insert the article
    cy.contains('New Article').click();
    cy.get('[formcontrolname="title"]').type('this is the new title (01)');
    cy.get('[formcontrolname="description"]').type(
      'this is the new description (01)'
    );
    cy.get('[formcontrolname="body"]').type('this is the new body (01)');
    cy.contains('Publish Article').click();

    //this for wait the response of the api and verify the response
    cy.wait('@postArticles').then((xhr) => {
      console.log(xhr);
      expect(xhr.response.statusCode).to.equal(201);
      expect(xhr.response.body.article.title).to.equal(
        'this is the new title (01)'
      );
      expect(xhr.response.body.article.description).to.equal(
        'this is the new description (01)'
      );
    });
    //to delete the article after the test case
    cy.contains('Delete Article').click();
  });
  //39. Mocking API Response
  it('verify the tags is displayed', () => {
    cy.log('verify the tags is displayed');
    cy.get('.tag-list').should('contain', 'cypress');
  });
  it.only('verify the goals feed like count', () => {
    //this for intercept the request and response for the your feed
    cy.intercept(
      'get',
      'https://conduit-api.bondaracademy.com/api/articles/feed*',
      { articles: [], articlesCount: 0 }
    );
    //this for intercept the request and response for the global feed
    cy.intercept('GET', 'https://conduit-api.bondaracademy.com/api/articles*', {
      fixture: 'articles.json',
    });

    cy.contains('Global Feed').click();
    cy.get('app-article-list button').then((hraderList) => {
      expect(hraderList[0].innerText).to.contain('1');
      expect(hraderList[1].innerText).to.contain('5');
    });
    //this to get the article link to call the api to update the like count on data saved in the fixture file articles.json
    cy.fixture('articles.json').then((data) => {
      const articleLink = data.articles[1].slug;
      data.articles[1].favoritesCount = 6;
      cy.intercept(
        'post',
        `https://conduit-api.bondaracademy.com/api/articles/${articleLink}/favorite`
      ).as('postFavorite');
    });
    cy.get('app-article-list button').eq(1).click().should('contain', '6');
  });
});
