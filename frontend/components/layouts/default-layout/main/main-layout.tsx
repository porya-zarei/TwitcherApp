import {FC} from "react";
import Sidebar from "./sidebar/sidebar";

interface MainLayoutProps {}

const MainLayout: FC<MainLayoutProps> = ({children}) => {
    return (
        <main>
            <div>
                <section className="w-full flex flex-row justify-evenly flex-nowrap items-start relative min-h-screen p-0 m-0 bg-dark text-light">
                    <aside className="w-full bg-dark md:w-1/5 fixed bottom-0 z-10 left-0 md:sticky md:top-0 border-r-[1px] border-secondary">
                        <Sidebar />
                    </aside>
                    <section className="w-full md:w-4/5">{children}</section>
                </section>
            </div>
        </main>
    );
};

export default MainLayout;
