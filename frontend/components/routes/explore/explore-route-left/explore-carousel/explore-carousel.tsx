import Image from "next/image";
import {FC} from "react";
import {getRandomNumber} from "../../../../../utils/helpers";
import Slider from "../../../../core-ui/slider/slider";

import defaultImage from "../../../../../assets/images/default-background.jpg";

interface ExploreCarouselProps {}

interface ExploreCarouselSlideData {
    imageUrl: string | StaticImageData;
    title: string;
    description: string;
}

const ExploreCarousel: FC<ExploreCarouselProps> = () => {
    const slides: ExploreCarouselSlideData[] = [
        {
            imageUrl: defaultImage,
            title: "Explore",
            description: "Explore description",
        },
        {
            imageUrl: defaultImage,
            title: "Explore",
            description: "Explore description",
        },
        {
            imageUrl: defaultImage,
            title: "Explore",
            description: "Explore description",
        },
    ];
    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-full h-[40vh] flex justify-center items-center">
                <Slider
                    pagination={false}
                    navigation={false}
                    className="w-full h-full justify-center items-center">
                    {slides.map((slide) => (
                        <div
                            className="w-full h-full relative"
                            key={getRandomNumber()}>
                            <Image
                                src={slide.imageUrl}
                                alt={slide.title}
                                layout="fill"
                            />
                            <div className="w-full absolute p-2 bottom-0 left-0 flex justify-center items-center flex-wrap">
                                <p className="w-full text-2xl">{slide.title}</p>
                                <p className="w-full text-lg">{slide.description}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default ExploreCarousel;
