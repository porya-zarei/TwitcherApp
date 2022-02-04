/// <reference types="cypress" />
import {
    getCookieValueClient,
    getCookieValueServer,
} from "../../../utils/cookies-helpers";

describe("Unit Test Application Code", () => {
    const testCookie: string =
        "key1=value; Token=eyJpZCI6IjE0ODUzMTI5LTVkZjEtNTQ2Zi05YmExLTk1MjczMTUyODI5MCIsImNyZWF0ZWQiOjE2NDA4ODk3MTE5OTgsImV4aXN0aW5nIjpmYWxzZX0=; sliguid=e2994fa9-1cf1-4123-b0fc-e18e124f0074;";
    const testKey: string = "Token";
    const testValue: string = "eyJpZCI6IjE0ODUzMTI5LTVkZjEtNTQ2Zi05YmExLTk1MjczMTUyODI5MCIsImNyZWF0ZWQiOjE2NDA4ODk3MTE5OTgsImV4aXN0aW5nIjpmYWxzZX0=";
    before(() => {
        // check if the import worked correctly
        expect(getCookieValueClient, "getCookieValueClient").to.be.a(
            "function",
        );
        expect(getCookieValueServer, "getCookieValueServer").to.be.a(
            "function",
        );
    });

    context("cookies helpers", () => {
        it("get value from cookie string", () => {
            const res = getCookieValueClient(testKey, testCookie);
            expect(res).to.equal(testValue);
        });
    });
});
