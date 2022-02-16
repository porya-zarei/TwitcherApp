import Image from "next/image";
import {FC} from "react";

import defaultProfile from "../../../../assets/images/default-profile.png";
import {baseImagesUrl, isDev} from "../../../../configs/globals";
import TweetImagesCarousel from "./tweet-images-carousel";

interface TweetImagesProps {
    images?: string[];
    video?: string;
    alt?: string;
    width?: number | string;
    height?: number | string;
}

const TweetImages: FC<TweetImagesProps> = ({
    images,
    video,
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
            {/* <Image
                    src={url}
                    layout="responsive"
                    alt={alt}
                    width={width}
                    height={height}
                /> */}
            <div className="w-full flex justify-center items-center">
                <TweetImagesCarousel video={video} images={images} />
            </div>
        </div>
    );
};

export default TweetImages;
