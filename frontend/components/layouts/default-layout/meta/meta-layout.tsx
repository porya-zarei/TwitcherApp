import Head from "next/head";
import {FC} from "react";

interface MetaLayoutProps {}

const MetaLayout: FC<MetaLayoutProps> = () => {
    return (
        <Head>
            <title>home page</title>
        </Head>
    );
};

export default MetaLayout;
