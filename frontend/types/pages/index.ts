import { NextPage } from "next";
import { ReactNode } from "react";

export type NextPageWithLayout = {
    getLayout?: (page:ReactNode) => ReactNode;
} & NextPage;

export type AppPropsWithLayout = {
    pageProps: any;
    Component: NextPageWithLayout;
}