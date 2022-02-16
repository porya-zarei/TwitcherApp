import {Children, FC} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {
    PaginationOptions,
    NavigationOptions,
    AutoplayOptions,
    LazyOptions,
} from "swiper/types";

import {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    EffectFade,
    Autoplay,
} from "swiper";

type SliderEffect =
    | "fade"
    | "slide"
    | "cube"
    | "coverflow"
    | "flip"
    | "creative"
    | "cards";

interface SliderProps {
    navigation?: NavigationOptions | boolean;
    spaceBetween?: number;
    slidesPerView?: number;
    autoplay?: boolean | AutoplayOptions;
    pagination?: PaginationOptions | boolean;
    loop?: boolean;
    className?: string;
    slideClassName?: string;
    effect?: SliderEffect;
    onSwiper?: (swiper: any) => void;
    onInit?: (swiper: any) => void;
    onSlideChange?: (swiper: any) => void;
    onBeforInit?: (swiper: any) => void;
    lazy?: boolean | LazyOptions;
}

const Slider: FC<SliderProps> = ({
    children,
    navigation = false,
    spaceBetween = 0,
    slidesPerView = 1,
    autoplay = false,
    pagination = {clickable: true},
    loop = true,
    className = "",
    effect = "fade",
    onSwiper,
    onInit,
    onSlideChange,
    onBeforInit,
    slideClassName = "",
    lazy = {loadPrevNext: true},
}) => {
    return (
        <Swiper
            className={className}
            effect={effect}
            modules={[
                Navigation,
                Pagination,
                Scrollbar,
                A11y,
                EffectFade,
                Autoplay,
            ]}
            spaceBetween={spaceBetween}
            slidesPerView={slidesPerView}
            loop={loop}
            autoplay={autoplay}
            onSlideChange={onSlideChange}
            onInit={onInit}
            onBeforeInit={onBeforInit}
            onSwiper={onSwiper}
            lazy={lazy}
            pagination={pagination}
            navigation={navigation}>
            {Children.map(children, (child, i) => (
                <SwiperSlide className={slideClassName} key={i}>
                    {child}
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Slider;
