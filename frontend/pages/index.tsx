import type {NextPage} from "next";
import Link from "next/link";

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
        </div>
    );
};

export default IndexPage;
