import {FC} from "react";
import FollowSuggestionView from "./follow-suggestion-view/follow-suggestion-view";
import SearchView from "./search-view/search-view";
import TrendsView from "./trends-view/trends-view";

interface SearchSideProps {}

const SearchSide: FC<SearchSideProps> = () => {
    return (
        <section className="w-full flex justify-center items-center content-start flex-wrap flex-row relative max-w-[300px]">
            <header className="w-full flex justify-center items-center flex-row flex-nowrap sticky top-0 z-10 bg-black h-12 px-2 py-1">
                <SearchView />
            </header>
            <main className="w-full flex justify-center items-center flex-row flex-wrap content-start px-2 mt-2">
                <div className="w-full flex justify-center items-center mb-2">
                    <TrendsView />
                </div>
                <div className="w-full flex justify-center items-center mb-2">
                    <FollowSuggestionView />
                </div>
            </main>
        </section>
    );
};

export default SearchSide;
