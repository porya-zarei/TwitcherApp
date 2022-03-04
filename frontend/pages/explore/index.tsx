import {NextPage} from "next";
import ExploreRoute from "../../components/routes/explore/explore-route";

interface ExplorePageProps {}

const ExplorePage: NextPage<ExplorePageProps> = () => {
    return <ExploreRoute />;
};

export default ExplorePage;
