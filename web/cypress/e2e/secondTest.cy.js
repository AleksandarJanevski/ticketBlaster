import { cred } from "../constants/constants";
describe("Buy Tickets", () => {
  beforeEach(() => {
    cy.main();
  });
  it("first test", () => {
    cy.intercept("GET", "http://localhost:3000/api/v1/events").as("getEventss");
    cy.creds();
    cy.wait("@getEventss").then((intercept) => {
      const response = intercept.response;
      if (response.statusCode !== 200) {
        cy.wait(2000).main().creds();
      }
    });
    cy.get("#hero_buttonn").click();
    cy.get("#ticket_number").find("button").click();
    cy.get("#checkoutBtn").click();
    cy.GetInputCC("text", cred.name);
    cy.GetInputCC("number", cred.cardNum);
    cy.get('input[type="month"]').type(cred.exp);
    cy.GetInputCC("password", cred.pin);
    cy.get("#checkout_bottom").find("button").eq(1).click();
    cy.get("#gratitude_right").find("button").click();
    // cy.get("#printCard").click();
    cy.go("back");
  });

  it("XSS", () => {
    cy.get("#search_bar")
      .type('<script/>alert("hell world")</script>')
      .type("{enter}");
  });
  it("test login", () => {
    cy.get("#loginButton").click();
    cy.get("#authBtn").click();
    cy.get("#login > :nth-child(2) > div").should("exist");
    cy.get("input[type='text'].inputField").type(cred.email);
    cy.get("input[type='password'].inputField").type(cred.pass);
    cy.get("#authBtn").click();
  });
});
