import {decode, JwtPayload} from "jsonwebtoken";

export const decodeToken = <T>(token: string) => {
    if (token) {
        const res = decode(token, {complete: true})?.payload as JwtPayload & T;
        if (typeof res === "object") {
            return res;
        } else {
            return null;
        }
    } else return null;
};

export const isExpired = (token: string) => {
    try {
        const res = decode(token, {complete: true, json: true});
        const exp =
            (typeof res?.payload === "object" && res?.payload?.exp) ||
            Date.now();
        if (Date.now() >= exp * 1000) return false;
        else return true;
    } catch (err) {
        return false;
    }
};
