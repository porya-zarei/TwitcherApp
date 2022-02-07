import {FC} from "react";
import Sidebar from "./sidebar/sidebar";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
    return (
        <div>
            <section className="w-full flex flex-row justify-evenly flex-nowrap items-start relative min-h-screen p-0 m-0 bg-black text-gray-100">
                <aside className="w-full md:w-1/5 fixed bottom-0 left-0 md:static border-r-[1px] border-gray-600">
                    <Sidebar />
                </aside>
                <section className="w-full md:w-4/5">
                    content
                </section>
            </section>
        </div>
    );
};

export default Home;
