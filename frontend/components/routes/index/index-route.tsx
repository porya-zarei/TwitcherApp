import {FC} from "react";

interface IndexRouteProps {}

const IndexRoute: FC<IndexRouteProps> = () => {
    return (
        <div className="w-full h-screen min-h-screen">
            <div className="w-full h-full flex justify-center items-center">
                <h1 className="text-4xl text-center">
                    Welcome to the Twitcher App!
                </h1>
            </div>
        </div>
    );
};

export default IndexRoute;
