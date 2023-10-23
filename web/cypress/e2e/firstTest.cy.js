describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/signUp");
    cy.get('input[name="sName"]').type("Alek Janevski");
    cy.get('input[name="sEmail"]').type("ex@ex.com");
    cy.get('input[name="sPass"]').type("Qwerty1!");
    cy.get('input[name="sRpass"]').type("Qwerty1!");
    cy.get("#authBtn").click();

    cy.get('input[name="email"]').type("ex@ex.com");
    cy.get('input[name="password"]').type("Qwerty1!");
    cy.get("#authBtn").click();
  });
});
