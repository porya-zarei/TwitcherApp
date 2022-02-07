import {FC} from "react";

interface MainLayoutProps {}

const MainLayout: FC<MainLayoutProps> = ({children}) => {
    return <main>{children}</main>;
};

export default MainLayout;
