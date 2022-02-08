import Image from "next/image";
import { FC } from "react";

import defaultProfile from "../../../../../../../../../assets/images/default-profile.png";

interface TweetImagesProps {
    images?: string[];
    alt?: string;
    width?: number|string;
    height?: number|string;
}
 
const TweetImages: FC<TweetImagesProps> = ({images,alt,width=300,height=450}) => {
    return (
        <div className="w-full flex justify-center items-center flex-wrap flex-row">
            <div className="tweet-view-image-container">
                <Image
                    src={images?.[0] ?? defaultProfile}
                    layout="responsive"
                    alt={alt}
                    width={width}
                    height={height}
                />
            </div>
        </div>
    );
}
 
export default TweetImages;