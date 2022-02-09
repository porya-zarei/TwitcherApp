import Image from "next/image";
import {FC} from "react";

import defaultProfile from "../../../../../../../../../assets/images/default-profile.png";
import {baseImagesUrl, isDev} from "../../../../../../../../../configs/globals";

interface TweetImagesProps {
    images?: string[];
    alt?: string;
    width?: number | string;
    height?: number | string;
}

const TweetImages: FC<TweetImagesProps> = ({
    images,
    alt,
    width = 300,
    height = 450,
}) => {
    let url: string = defaultProfile.src;
    if (images && images.length > 0) {
        url = baseImagesUrl + images[0];
    }
    return (
        <div className="w-full flex justify-center items-center flex-wrap flex-row">
            <div className="tweet-view-image-container">
                {isDev ? (
                    <img src={url} width={"100%"} alt={alt} />
                ) : (
                    <Image
                        src={url}
                        layout="responsive"
                        alt={alt}
                        width={width}
                        height={height}
                    />
                )}
            </div>
        </div>
    );
};

export default TweetImages;
