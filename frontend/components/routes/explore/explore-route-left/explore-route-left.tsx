import { FC } from "react";
import MainLayoutSidesContaier from "../../../core-ui/main-layout-container/main-layout-sides-container/main-layout-sides-container";
import SearchView from "../../../core-ui/search-view/search-view";
import TrendsView from "../../../core-ui/trends-view/trends-view";
import ExploreCarousel from "./explore-carousel/explore-carousel";

interface ExploreRouteLeftProps {
    
}
 
const ExploreRouteLeft: FC<ExploreRouteLeftProps> = () => {
    return (
        <MainLayoutSidesContaier
            headerComponent={<SearchView />}
            containerClassName="min-w-full"
            headerContainerClassName="flex-row flex-nowrap h-12"
            mainComponent={
                <>
                    <div className="w-full flex justify-center items-center mb-2">
                        <ExploreCarousel />
                    </div>
                    <div className="w-full flex justify-center items-center mb-2">
                        <TrendsView cardContainerClassName="rounded-none bg-transparent-important" />
                    </div>
                </>
            }
            mainContainerClassName="flex-row flex-wrap px-2 mt-2 mb-20"
        />
    );
}
 
export default ExploreRouteLeft;