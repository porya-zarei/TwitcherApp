import Image from "next/image";
import {FC, useRef} from "react";
import {HiOutlinePhotograph} from "react-icons/hi";
import {useChangeUserImages} from "../../../../api/mutations/useChangeUserImages";
import defaultBackground from "../../../../assets/images/default-background.jpg";
import defaulltProfile from "../../../../assets/images/default-profile.png";
import {useUserContext} from "../../../../contexts/user-context/user-context";
import useNotification from "../../../../hooks/useNotification";
import {IUserImagesChangedData} from "../../../../types/data/user";
import Avatar from "../../../core-ui/avatar/avatar";
import UserStatus from "./user-status";

interface UserImagesProps {}

const UserImages: FC<UserImagesProps> = () => {
    const {notify} = useNotification();
    const {token, changeUser, user} = useUserContext();
    const profileInputRef = useRef<HTMLInputElement>(null);
    const backgroundInputRef = useRef<HTMLInputElement>(null);
    const {mutateAsync} = useChangeUserImages();
    const handleClick = (type: "profile" | "background") => {
        if (type === "profile") {
            return () => {
                profileInputRef.current?.click();
            };
        } else {
            return () => {
                backgroundInputRef.current?.click();
            };
        }
    };
    const handleChangeUserProfiles = async () => {
        const formData = new FormData();
        const isSame =
            user?.backgroundImage?.includes(
                backgroundInputRef?.current?.files?.[0]?.name || "~~~~~~~",
            ) ||
            user?.profileImage?.includes(
                profileInputRef?.current?.files?.[0]?.name || "~~~~~~~",
            );
        if (!isSame) {
            if (
                profileInputRef.current?.files &&
                profileInputRef.current?.files.length > 0
            ) {
                formData.append(
                    "profileImage",
                    profileInputRef.current?.files[0],
                );
            }
            if (
                backgroundInputRef.current?.files &&
                backgroundInputRef.current?.files.length > 0
            ) {
                formData.append(
                    "backgroundImage",
                    backgroundInputRef.current?.files[0],
                );
            }
            const data: IUserImagesChangedData = {
                data: formData,
                token: token || "",
            };
            const result = await mutateAsync(data);
            if (result.ok) {
                changeUser?.((user) => {
                    const newUser = {...user};
                    if (result?.result?.backgroundImage.length > 0) {
                        newUser.backgroundImage = result.result.backgroundImage;
                    }
                    if (result?.result?.profileImage.length > 0) {
                        newUser.profileImage = result.result.profileImage;
                    }
                    return newUser;
                });
                notify("Successfully your image changed.");
            }
        } else {
            notify("You have already uploaded the same image.");
        }
    };
    return (
        <div className="w-full h-[40vh] flex justify-center items-center bg-secondary">
            <div className="w-full h-full flex justify-center items-center relative">
                <Image
                    className="w-full h-full absolute top-0 left-0 z-10"
                    alt="user background image"
                    src={defaultBackground}
                    layout="fill"
                />
                <div className="w-full relative h-full z-20 flex justify-center items-center">
                    <button
                        onClick={handleClick("profile")}
                        type="button"
                        title="user profile"
                        className="absolute top-5 left-5 flex justify-center items-center">
                        <Avatar
                            containerClassName="relative h-8 w-8 md:h-10 md:w-10"
                            alt="user profile"
                            src={defaulltProfile}
                            layout="fill"
                            className="w-full h-full"
                        />
                        <input
                            hidden={true}
                            accept="image/*"
                            className="hidden"
                            multiple={false}
                            type="file"
                            ref={profileInputRef}
                            onChange={handleChangeUserProfiles}
                        />
                    </button>
                    <button
                        onClick={handleClick("background")}
                        title="change background image"
                        type="button"
                        className="bg-light bg-opacity-20 rounded-full outline-none text-slate-400 p-3 scale-125 text-[40px] hover:bg-opacity-80 backdrop-blur-sm">
                        <HiOutlinePhotograph />
                        <input
                            hidden={true}
                            accept="image/*"
                            className="hidden"
                            multiple={false}
                            type="file"
                            ref={backgroundInputRef}
                            onChange={handleChangeUserProfiles}
                        />
                    </button>
                    <div className="absolute bottom-1 left-1 p-2">
                        <UserStatus />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserImages;
