import {NextPage} from "next";
import ProfileRoute from "../../components/routes/profile/profile-route";

interface PtofilePageProps {}

const PtofilePage: NextPage<PtofilePageProps> = () => {
    return <ProfileRoute />;
};

export default PtofilePage;
