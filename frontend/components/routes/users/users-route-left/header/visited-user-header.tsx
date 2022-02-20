import Image from "next/image";
import {FC} from "react";
import {
    HiBell,
    HiCalendar,
    HiDotsHorizontal,
    HiLink,
    HiLocationMarker,
} from "react-icons/hi";

import {PartialUser} from "../../../../../types/data/user";
import {getPrettyDate} from "../../../../../utils/date-helper";
import {
    getUserBackgroundImage,
    getUserProfileImage,
} from "../../../../../utils/helpers";
import Avatar from "../../../../core-ui/avatar/avatar";
import FollowingButton from "./following-button/following-button";
interface VisitedUserHeaderProps {
    user?: PartialUser;
}

const VisitedUserHeader: FC<VisitedUserHeaderProps> = ({user}) => {
    const avatarUrl = getUserProfileImage(user);
    const backgroundUrl = getUserBackgroundImage(user);
    return (
        <section className="w-full flex justify-center items-center">
            <div className="w-full relative flex justify-center items-start content-start flex-wrap flex-row">
                <div className="relative w-full h-[30vh] inline-block">
                    <Image
                        src={backgroundUrl}
                        layout="fill"
                        alt="user background"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute top-[20vh] left-5 border-dark border-4 rounded-full">
                    <Avatar
                        src={avatarUrl}
                        alt="user avatar"
                        layout="responsive"
                        height={120}
                        width={120}
                    />
                </div>
                <div className="w-full h-16 flex justify-end items-center">
                    <div className="m-1">
                        <button
                            title="More"
                            type="button"
                            className="transition-all h-10 w-10 rounded-full font-bold text-lg hover:bg-slate-500 hover:bg-opacity-10 border-[1px] border-secondary flex justify-center items-center ">
                            <HiDotsHorizontal className="" />
                        </button>
                    </div>
                    <div className="m-1">
                        <button
                            title="Notifications"
                            type="button"
                            className="h-10 w-10 transition-all rounded-full font-bold text-lg hover:bg-slate-500 hover:bg-opacity-10 border-[1px] border-secondary flex justify-center items-center">
                            <HiBell className="" />
                        </button>
                    </div>
                    <div className="m-1">
                        <FollowingButton user={user} />
                    </div>
                </div>
                <div className="w-full flex justify-start content-evenly flex-wrap flex-row px-4">
                    <div className="w-full font-extrabold text-lg">
                        {user?.firstName + " " + user?.lastName}
                    </div>
                    <div className="w-full text-secondary mb-3">
                        @{user?.userName}
                    </div>
                    <div className="w-full flex justify-start items-center">
                        <p>{user?.bio}</p>
                    </div>
                    <div className="w-full flex justify-start items-center flex-wrap text-lg">
                        <span className="pr-2 py-1 text-secondary inline-flex justify-center items-center">
                            <span className="pr-1">
                                <HiLocationMarker />
                            </span>
                            <span>test location</span>
                        </span>
                        <span className="pr-2 py-1 text-secondary inline-flex justify-center items-center">
                            <span className="pr-1">
                                <HiLink />
                            </span>
                            <a className="text-dark-primary cursor-pointer hover:underline">
                                test website
                            </a>
                        </span>
                        <span className="pr-2 py-1 text-secondary inline-flex justify-center items-center">
                            <span className="pr-1">
                                <HiCalendar />
                            </span>
                            <span className="mr-1">Joined</span>
                            <span>{getPrettyDate(user?.joinedAt || "")}</span>
                        </span>
                    </div>
                    <div className="w-full flex justify-start items-center">
                        <span className="mr-3">
                            <span className="mr-1 font-bold">
                                {user?.followersCount||0}
                            </span>
                            <span className="text-secondary">Following</span>
                        </span>
                        <span className="mr-3">
                            <span className="mr-1 font-bold">
                                {user?.followingsCount||0}
                            </span>
                            <span className="text-secondary">Following</span>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VisitedUserHeader;
