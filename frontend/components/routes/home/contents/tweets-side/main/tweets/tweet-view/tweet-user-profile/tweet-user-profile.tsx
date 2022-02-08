import Image from "next/image";
import {FC} from "react";
import defaultProfile from "../../../../../../../../../assets/images/default-profile.png";

interface TweetUserProfileProps {
    profileImage?: string;
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
    return (
        <div className="flex justify-center items-start p-2">
            <div className="rounded-full w-[50px] h-[50px] overflow-hidden">
                <Image
                    src={profileImage ?? defaultProfile}
                    layout="intrinsic"
                    alt={alt}
                    width={width}
                    height={height}
                />
            </div>
        </div>
    );
};

export default TweetUserProfile;
