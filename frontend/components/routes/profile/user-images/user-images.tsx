import Image from "next/image";
import {FC} from "react";
import defaultBackground from "../../../../assets/images/default-background.jpg";

interface UserImagesProps {}

const UserImages: FC<UserImagesProps> = () => {
    return (
        <div className="w-full h-[70vh] flex justify-center items-center bg-secondary">
            <div className="w-full h-full flex justify-center items-center relative">
                <Image
                    className="w-full h-full absolute top-0 left-0 z-10"
                    alt="user background image"
                    src={defaultBackground}
                    layout="fill"
                    width={1000}
                    height={500}
                />
            </div>
        </div>
    );
};

export default UserImages;
