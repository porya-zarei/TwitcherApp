import {FC} from "react";
import HomeContents from "./contents/home-contents";
import HomeSidebar from "./sidebar/home-sidebar";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
    return (
        <div>
            <section className="w-full flex flex-row justify-evenly flex-nowrap items-start relative min-h-screen p-0 m-0 bg-dark text-light">
                <aside className="w-full bg-dark md:w-1/5 fixed bottom-0 z-10 left-0 md:sticky md:top-0 border-r-[1px] border-secondary">
                    <HomeSidebar />
                </aside>
                <section className="w-full md:w-4/5">
                    <HomeContents/>
                </section>
            </section>
        </div>
    );
};

export default Home;
