import {FC} from "react";
import NotificationsRoute from "../../components/routes/notifications/notifications-route";

interface NotificationsPageProps {}

const NotificationsPage: FC<NotificationsPageProps> = () => {
    return (
        <div className="w-full">
            <NotificationsRoute />
        </div>
    );
};

export default NotificationsPage;
