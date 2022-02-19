import {mount} from "@cypress/react";
import Avatar from "../../../../components/core-ui/avatar/avatar";

const template: {
    alt: string;
    src: any;
    width: number;
    height: number;
    layout: "fill" | "responsive";
} = {
    alt: "avatar",
    src: "https://via.placeholder.com/150",
    layout: "fill",
    width: 50,
    height: 50,
};
// test Avatar component
describe("Avatar component", () => {
    beforeEach(() => {
        mount(<Avatar {...template} />);
    });
    it("test attribuites", () => {
        cy.get("div").should("have.class", "rounded-full overflow-hidden");
        cy.get("img")
            .should("exist")
            .should("have.attr", "src")
            .should(
                "contain",
                template.src.replace("https://", "").replace("/150", ""),
            );
        cy.get("img").should("have.attr", "alt").should("contain", template.alt);
        cy.get("img").should("have.attr", "style");
    });
});
