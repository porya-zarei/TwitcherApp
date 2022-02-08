import {FC} from "react";
import { HiSearch } from "react-icons/hi";
import SearchSuggestionView from "./search-suggestion-view/search-suggestion";

interface SearchViewProps {}

const SearchView: FC<SearchViewProps> = () => {
    return (
        <div className="w-full relative h-full flex justify-center items-center flex-nowrap flex-row">
            <div className="w-full h-full flex justify-between items-center rounded-full bg-slate-600 bg-opacity-70 peer">
                <button
                    type="button"
                    title="search"
                    className="border-none bg-transparent flex justify-center items-center p-3">
                    <HiSearch size={25} />
                </button>
                <div className="w-full h-10 flex justify-between items-center flex-nowrap flex-row p-1">
                    <input
                        className="w-full h-full bg-transparent border-none outline-none p-2"
                        type="text"
                        placeholder="Search twitcher"
                    />
                </div>
            </div>
            <div className="w-full absolute top-[40px] left-0 z-20 hidden peer-hover:flex hover:flex justify-center items-center">
                <div className="w-full max-h-96 overflow-y-auto overflow-x-hidden">
                    <SearchSuggestionView/>
                </div>
            </div>
        </div>
    );
};

export default SearchView;
