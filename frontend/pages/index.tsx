import type {NextPage} from "next";
import Link from "next/link";
import {useEffect, useRef} from "react";

const IndexPage: NextPage = () => {
    return (
        <div className="">
            <Link href={"/home/"}>
                <a>home page</a>
            </Link>
            <Link href={"/auth/login/"}>
                <a>login page</a>
            </Link>
            <Link href={"/auth/register/"}>
                <a>register page</a>
            </Link>
            <Link href={"/tweets/b65816e8-6a22-4bdd-b088-9cd36ab5e96f"}>
                <a>tweets</a>
            </Link>
        </div>
    );
};

export default IndexPage;
