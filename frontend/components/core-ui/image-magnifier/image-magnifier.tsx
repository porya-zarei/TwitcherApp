import Image from "next/image";
import {FC, useEffect} from "react";
import {useMagnifier} from "../../../hooks/useMagnifier";

interface ImageMagnifierProps {
    scale: number;
    src: StaticImageData | string;
    useNextImage?: boolean;
    alt?: string;
}

const ImageMagnifier: FC<ImageMagnifierProps> = ({
    src = "",
    scale = 1.5,
    useNextImage = false,
    alt = "",
}) => {
    const {
        containerRef,
        imageRef,
        sibilingRef,
        isMagnifying,
        handleMouseLeave,
        handleMouseMove,
        handleMouseEnter,
        initialize,
    } = useMagnifier(scale);
    useEffect(() => {}, []);
    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            className={`w-full h-full relative ${
                useNextImage ? "inline-block" : "flex"
            } justify-center items-center overflow-hidden`}>
            {useNextImage ? (
                <Image
                    className="w-full h-full z-0"
                    src={src}
                    layout="responsive"
                    width={100}
                    height={100}
                    alt={alt}
                    onLoadingComplete={() => {
                        initialize();
                    }}
                />
            ) : (
                <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        alt={alt}
                        src={typeof src === "string" ? src : src.src}
                        className="w-full h-full z-0"
                        ref={imageRef}
                    />
                </>
            )}
            <div
                ref={sibilingRef}
                className={`absolute transition-transform top-0 left-0 z-20 w-full h-full cursor-zoom-in flex justify-center items-center ${
                    !isMagnifying && "hidden"
                }`}></div>
            <span className="sr-only">{alt}</span>
        </div>
    );
};

export default ImageMagnifier;
