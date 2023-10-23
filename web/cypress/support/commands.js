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
import { cred } from "../constants/constants";
Cypress.Commands.add("GetInputCC", (type, value) => {
  return cy.get(`input[type=${type}].inputField`).type(`${value}`);
});
Cypress.Commands.add("main", () => {
  cy.viewport(1920, 1080);
  cy.visit("http://localhost:3000");
});
Cypress.Commands.add("creds", () => {
  cy.setCookie(cred.cType, cred.cValue);
});
