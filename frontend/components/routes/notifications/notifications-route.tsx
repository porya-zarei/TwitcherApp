import {FC} from "react";
import bg from "../../../assets/images/default-background.jpg";
import ImageMagnifier from "../../core-ui/image-magnifier/image-magnifier";
interface NotificationsRouteProps {}

const NotificationsRoute: FC<NotificationsRouteProps> = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-1/2 h-1/2 flex justify-center items-center">
                <ImageMagnifier src={bg} scale={1.5} useNextImage={true} />
            </div>
        </div>
    );
};

export default NotificationsRoute;
