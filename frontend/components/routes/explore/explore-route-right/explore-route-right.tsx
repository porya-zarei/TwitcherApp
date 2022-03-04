import { FC } from "react";
import MainLayoutSidesContaier from "../../../core-ui/main-layout-container/main-layout-sides-container/main-layout-sides-container";
import TrendsView from "../../../core-ui/trends-view/trends-view";

interface ExploreRouteRightProps {
    
}
 
const ExploreRouteRight: FC<ExploreRouteRightProps> = () => {
    return (
        <MainLayoutSidesContaier
            headerComponent={<div className="w-full h-12 bg-dark flex justify-center items-center drop-shadow-lg">
                <h4 className="text-xl font-bold">Explore More</h4>
            </div>}
            containerClassName="max-w-[300px]"
            headerContainerClassName="flex-row flex-nowrap h-12"
            mainComponent={
                <>
                    <div className="w-full flex justify-center items-center mb-2">
                        <TrendsView />
                    </div>
                </>
            }
            mainContainerClassName="flex-row flex-wrap px-2 mt-2"
        />
    );
}
 
export default ExploreRouteRight;