import type {NextPage} from "next";
import Link from "next/link";

const IndexPage: NextPage = () => {
    return (
        <div className="">
            Hello Nextjs
            <Link href={"/home/"}>
                <a>home page</a>
            </Link>
        </div>
    );
};

export default IndexPage;
