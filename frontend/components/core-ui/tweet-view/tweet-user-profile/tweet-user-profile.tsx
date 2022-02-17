import {FC} from "react";
import defaultProfile from "../../../../assets/images/default-profile.png";
import { getUserProfileImage } from "../../../../utils/helpers";
import Avatar from "../../../core-ui/avatar/avatar";

interface TweetUserProfileProps {
    profileImage?: string | StaticImageData;
    alt?: string;
    width?: number | string;
    height?: number | string;
}

const TweetUserProfile: FC<TweetUserProfileProps> = ({
    profileImage,
    alt = "sender profile",
    height = 50,
    width = 50,
}) => {
    let imageUrl = getUserProfileImage(profileImage);
    return (
        <div className="flex justify-center items-start p-2">
            <Avatar
                src={imageUrl}
                layout="intrinsic"
                alt={alt}
                height={height}
                width={width}
            />
        </div>
    );
};

export default TweetUserProfile;
