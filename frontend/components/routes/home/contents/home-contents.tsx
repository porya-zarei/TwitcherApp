import {FC} from "react";
import SearchSide from "./search-side/search-side";
import TweetsSide from "./tweets-side/tweets-side";

interface HomeContentsProps {}

const HomeContents: FC<HomeContentsProps> = () => {
    return (
        <div className="w-full flex justify-center relative items-center flex-nowrap flex-row overflow-hidden min-h-screen h-screen">
            <section className="w-full flex justify-evenly relative items-start flex-nowrap flex-row min-h-full h-full overflow-y-scroll">
                <div className="w-3/5 border-r-[1px] border-gray-600 h-auto">
                    <TweetsSide />
                </div>
                <div className="w-2/5 h-auto">
                    <SearchSide />
                </div>
            </section>
        </div>
    );
};

export default HomeContents;
