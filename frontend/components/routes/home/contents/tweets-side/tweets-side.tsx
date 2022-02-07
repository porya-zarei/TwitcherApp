import {FC} from "react";
import TweetsSideHeader from "./header/tweets-side-header";
import TweetsSideMain from "./main/tweets-side-main";

interface TweetsSideProps {}

const TweetsSide: FC<TweetsSideProps> = () => {
    return (
        <section className="w-full flex justify-center items-center content-start flex-wrap flex-row relative">
            <header className="w-full flex justify-center items-center flex-row flex-nowrap sticky top-0 z-10">
                <TweetsSideHeader />
            </header>
            <main className="w-full">
                <TweetsSideMain />
            </main>
        </section>
    );
};

export default TweetsSide;
