import {FC} from "react";
import { ToastContainer } from "react-toastify";
import PageProgressBar from "../../core-ui/page-progress-bar/page-progress-bar";
import FooterLayout from "./footer/footer-layout";
import HeaderLayout from "./header/header-layout";
import MainLayout from "./main/main-layout";
import MetaLayout from "./meta/meta-layout";

interface DefaultLayoutProps {}

const DefaultLayout: FC<DefaultLayoutProps> = ({children}) => {
    return (
        <div>
            <MetaLayout />
            <HeaderLayout />
            <PageProgressBar/>
            <MainLayout>{children}</MainLayout>
            <ToastContainer/>
            <FooterLayout />
        </div>
    );
};

export default DefaultLayout;
