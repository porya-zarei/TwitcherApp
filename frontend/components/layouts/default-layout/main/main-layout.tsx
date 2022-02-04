import {FC} from "react";

interface MainLayoutProps {}

const MainLayout: FC<MainLayoutProps> = ({children}) => {
    return <main className="">{children}</main>;
};

export default MainLayout;
