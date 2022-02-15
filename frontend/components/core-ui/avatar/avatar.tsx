import Image from "next/image";
import {FC} from "react";

interface AvatarProps {
    width?: string | number;
    height?: string | number;
    className?: string;
    containerClassName?: string;
    src: string | StaticImageData;
    alt: string;
    layout: "intrinsic" | "fill" | "responsive" | "fixed";

}

const Avatar: FC<AvatarProps> = ({
    height = 50,
    width = 50,
    src,
    alt,
    layout,
    className = "",
    containerClassName = "",
}) => {
    return (
        <div
            style={{
                width: width,
                height: height,
            }}
            className={`rounded-full overflow-hidden ${containerClassName}`}>
            <Image
                src={src}
                title={alt}
                layout={layout}
                alt={alt}
                width={width}
                height={height}
                className={className}
            />
        </div>
    );
};

export default Avatar;
