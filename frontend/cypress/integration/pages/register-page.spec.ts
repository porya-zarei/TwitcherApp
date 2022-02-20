import { app_url } from "../configs/globals";

describe("test register page", () => {
    beforeEach(() => {
        cy.visit(`${app_url}auth/register`);
    });
    it("should have a title", () => {
        cy.title().should("include", "Register");
        cy.get("h2").should("contain", "register to join us");
        cy.get("#first-name").should(
            "have.attr",
            "placeholder",
            "First Name",
        );
        cy.get("#last-name").should(
            "have.attr",
            "placeholder",
            "Last Name",
        );
        cy.get("#email-address").should(
            "have.attr",
            "placeholder",
            "Email",
        );
        cy.get("#user-name").should(
            "have.attr",
            "placeholder",
            "User Name",
        );
        cy.get("#password").should("have.attr", "placeholder", "Password");
        cy.get("a.text-primary")
            .should("contain", "have a account ?")
            .should("have.attr", "href", "/auth/login");
        cy.get("#register-button").should("have.attr", "type", "submit");
    });
});
