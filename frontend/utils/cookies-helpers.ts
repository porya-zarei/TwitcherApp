import {NextApiRequest} from "next";

export const getCookieValueServer = (req: NextApiRequest, key: string): string | null => {
    try {
        let stringCookie: string | Record<string, string> =
            req.headers.cookie || req.cookies;
        if (typeof stringCookie === "string") {
            const cookies = stringCookie.split(";").reduce((acc, cur) => {
                const [key, value] = cur.split("=");
                acc[key.trim()] = value;
                return acc;
            }, {} as Record<string, string>);
            return cookies[key];
        } else {
            return stringCookie[key];
        }
    } catch (error) {
        return null;
    }
};

export const getCookieValueClient = (name: string, cookies: string): string => {
    return (
        cookies
            ?.split("; ")
            ?.find((row) => row?.startsWith(`${name}=`))
            ?.split(`${name}=`)[1] || ""
    );
};
