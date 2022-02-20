import type {GetServerSideProps, NextApiRequest, NextPage} from "next";
import Link from "next/link";
import {useEffect, useRef} from "react";
import IndexRoute from "../components/routes/index/index-route";
import {getCookieValueServer} from "../utils/cookies-helpers";

const IndexPage: NextPage = () => {
    return <IndexRoute />;
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps = async ({res, req}) => {
    let token = getCookieValueServer(req as NextApiRequest, "token") ?? "";
    if (token.length > 0) {
        res.writeHead(302, {
            Location: "/home",
        });
        res.end();
        return {
            props: {},
        };
    } else {
        res.writeHead(302, {
            Location: "/auth/login",
        });
        res.end();
        return {
            props: {},
        };
    }
};
