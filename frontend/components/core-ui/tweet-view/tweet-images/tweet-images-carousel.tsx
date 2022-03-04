import Image from "next/image";
import {FC} from "react";
import {baseImagesUrl, baseVideoUrl} from "../../../../configs/globals";
import Slider from "../../slider/slider";

interface TweetImagesCarouselProps {
    images?: string[];
    video?: string;
}

const TweetImagesCarousel: FC<TweetImagesCarouselProps> = ({images, video}) => {
    return (
        <div className="flex justify-center items-center overflow-hidden relative">
            {video && video.length > 0 ? (
                <Slider
                    effect="slide"
                    navigation={true}
                    pagination={false}
                    className="custom-swiper w-full flex justify-center items-center overflow-hidden rounded-md"
                    slideClassName="w-full justify-center items-center">
                    <div className="w-full h-80 flex justify-center items-center">
                        <video
                            className="w-full h-full"
                            controls
                            src={baseVideoUrl + video}
                        />
                    </div>
                    {images &&
                        images.map?.((image) => (
                            <div
                                className="w-full h-80 flex justify-center items-center"
                                key={image}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    className="h-full w-full"
                                    src={baseImagesUrl + image}
                                    alt={""}
                                />
                            </div>
                        ))}
                </Slider>
            ) : (
                <Slider
                    effect="slide"
                    navigation={true}
                    pagination={false}
                    className="custom-swiper w-full flex justify-center items-center overflow-hidden rounded-md"
                    slideClassName="w-full justify-center items-center">
                    {images &&
                        images.map?.((image) => (
                            <div
                                className="w-full h-80 flex justify-center items-center"
                                key={image}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    className="h-full w-full"
                                    src={baseImagesUrl + image}
                                    alt={""}
                                />
                                {/* <Image alt="" src={baseImagesUrl+image} layout="fill" /> */}
                            </div>
                        ))}
                </Slider>
            )}
        </div>
    );
};

export default TweetImagesCarousel;
