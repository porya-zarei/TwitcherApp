import "../styles/globals.scss";
import {AppPropsWithLayout} from "../types/pages";
import {ReactNode, useState} from "react";
import {Hydrate, QueryClient, QueryClientProvider} from "react-query";
import MainContextProvider from "../contexts/main-context/main-context";
import DefaultLayout from "../components/layouts/default-layout/layout";

const MyApp = ({Component, pageProps}: AppPropsWithLayout) => {
    const getLayout =
        Component?.getLayout ||
        ((page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>);

    const [queryClient] = useState<QueryClient>(new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <MainContextProvider>
                    {getLayout(<Component {...pageProps} />)}
                </MainContextProvider>
            </Hydrate>
        </QueryClientProvider>
    );
};

export default MyApp;
