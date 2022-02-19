import {useRouter} from "next/router";
import {FC} from "react";
import {useVisitedUser} from "../../../../api/queries/useVisitedUser";
import {useUserContext} from "../../../../contexts/user-context/user-context";
import MainLayoutSidesContaier from "../../../core-ui/main-layout-container/main-layout-sides-container/main-layout-sides-container";
import SimpleHeader from "../../../core-ui/simple-header/simple-header";
import VisitedUserHeader from "./header/visited-user-header";
import VisitedUserMain from "./main/visited-user-main";

interface UsersRouteLeftProps {}

const UsersRouteLeft: FC<UsersRouteLeftProps> = () => {
    const router = useRouter();
    const userName: string = router.query.userName as string;
    const {token} = useUserContext();
    const {data} = useVisitedUser(userName, token ?? "");
    return (
        <MainLayoutSidesContaier
            headerComponent={
                <SimpleHeader
                    title={
                        data?.result.firstName + " " + data?.result.lastName ||
                        ""
                    }
                    withBack={true}
                    containerClassName="h-12 bg-dark bg-opacity-50 backdrop-blur-md"
                />
            }
            headerContainerClassName="flex-row flex-nowrap"
            mainComponent={
                <div className="w-full flex justify-center items-start flex-wrap content-start">
                    <VisitedUserHeader user={data?.result} />
                    <VisitedUserMain user={data?.result} />
                </div>
            }
        />
    );
};

export default UsersRouteLeft;
