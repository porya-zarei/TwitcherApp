import { app_url } from "../configs/globals";

describe("test login page", () => {
    beforeEach(() => {
        cy.visit(`${app_url}auth/login`);
    });
    it("should have a title", () => {
        cy.title().should("include", "Login");
        cy.get("h2").should("contain", "login to your account");
        cy.get("#email-address").should(
            "have.attr",
            "placeholder",
            "Email or UserName",
        );
        cy.get("#password")
            .should("have.attr", "placeholder", "Password");
        cy.get("a.text-primary")
            .should("contain", "create a account ?")
            .should("have.attr", "href", "/auth/register");
        cy.get("#login-button").should("have.attr", "type", "submit");
    });
});
