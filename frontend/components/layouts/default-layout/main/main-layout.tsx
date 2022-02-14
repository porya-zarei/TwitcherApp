import {useRouter} from "next/router";
import {FC} from "react";
import { getContainerClassName, getSidebarClassName } from "./functions";
import Sidebar from "./sidebar/sidebar";

interface MainLayoutProps {}


const MainLayout: FC<MainLayoutProps> = ({children}) => {
    const router = useRouter();
    return (
        <main>
            <section className="w-full flex flex-row justify-evenly flex-nowrap items-start relative min-h-screen p-0 m-0 bg-dark text-light">
                <aside
                    className={`w-full bg-dark ${getSidebarClassName(
                        router.pathname,
                    )} fixed bottom-0 z-10 left-0 md:sticky md:top-0 border-r-[1px] border-secondary`}>
                    <Sidebar />
                </aside>
                <section
                    className={`w-full ${getContainerClassName(
                        router.pathname,
                    )} flex justify-center items-center`}>
                    {children}
                </section>
            </section>
        </main>
    );
};

export default MainLayout;
