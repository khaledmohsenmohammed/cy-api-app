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
Cypress.Commands.add('loginToApplication', () => {
  const user = {
    user: {
      email: 'yesekix413@iliken.com',
      password: 'yesekix413@iliken.com',
    },
  };
  cy.request(
    'POST',
    'https://conduit-api.bondaracademy.com/api/users/login',
    user
  )
    .its('body')
    .then((body) => {
      const token = body.user.token;
      cy.wrap(token).as('tokenSaved');
      cy.visit('/', {
        onBeforeLoad(win) {
          win.localStorage.setItem('jwtToken', token);
        },
      });
    });

  //login to the application buy the UI
  // cy.visit('/login');
  // cy.get('[placeholder="Email"]').type('yesekix413@iliken.com');
  // cy.get('[placeholder="Password"]').type('yesekix413@iliken.com');
  // cy.get('form').submit();
});
