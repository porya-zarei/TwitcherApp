import {FC} from "react";
import MainLayoutSidesContaier from "../../../../core-ui/main-layout-container/main-layout-sides-container/main-layout-sides-container";
import SearchView from "../../../../core-ui/search-view/search-view";
import TrendsView from "../../../../core-ui/trends-view/trends-view";
import dynamic from "next/dynamic";

interface SearchSideProps {}

const FollowSuggestionView = dynamic(
    () => import("./follow-suggestion-view/follow-suggestion-view"),
    {ssr: false},
);

const SearchSide: FC<SearchSideProps> = () => {
    return (
        <MainLayoutSidesContaier
            containerClassName="max-w-[300px]"
            headerComponent={<SearchView />}
            headerContainerClassName="flex-row flex-nowrap h-12"
            mainComponent={
                <>
                    <div className="w-full flex justify-center items-center mb-2">
                        <TrendsView />
                    </div>
                    <div className="w-full flex justify-center items-center mb-2">
                        <FollowSuggestionView />
                    </div>
                </>
            }
            mainContainerClassName="flex-row flex-wrap px-2 mt-2"
        />
    );
};

export default SearchSide;
