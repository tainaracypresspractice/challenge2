// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
import Routes from './routes';

// ***********************************************************
Cypress.Commands.add('backgroundLogin', () => {
    cy.request({
        method: 'POST',
        url: `${Cypress.config().apiUrl}users/login`,
        body: {
            user: {
                email: 'tai@mail.com',
                password: 'agilizei'
            }
        }
    }).then((loginResponse) => {
        cy.log(loginResponse.body.user.token)
        cy.visit('', {
            onBeforeLoad: (win) => {
                win.localStorage.setItem('jwtToken', loginResponse.body.user.token)
            }
        });
    });
})

before (() => {
    Routes.init();
});