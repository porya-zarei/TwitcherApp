import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { HiOutlineCog } from "react-icons/hi";
import SimpleCard from "../../../../../core-ui/simple-card/simple-card";
import defaultProfile from "../../../../../../assets/images/default-profile.png";

interface FollowSuggestionViewProps {
    
}

interface IFollowSuggestion {
    userName?: string;
    title?: string;
    profileImage?: string;
    url?: string;
    onFollow?: () => void;
}

const SUGGESTIONS: IFollowSuggestion[] = [
    {
        userName: "userName 1",
        title: "title 1",
        profileImage: "profileImage 1",
        url: "/trends/trending-1",
        onFollow: () => {},
    },
    {
        userName: "userName 2",
        title: "title 2",
        profileImage: "profileImage 2",
        url: "/trends/trending-2",
        onFollow: () => {},
    },
    {
        userName: "userName 3",
        title: "title 3",
        profileImage: "profileImage 3",
        url: "/trends/trending-3",
        onFollow: () => {},
    },
];
 
const FollowSuggestionView: FC<FollowSuggestionViewProps> = () => {
    return (
        <div className="w-full flex justify-center items-center">
            <SimpleCard
                icon={<HiOutlineCog size={20} />}
                items={SUGGESTIONS}
                title="Trends for you"
                containerClassName="bg-slate-700 bg-opacity-50 rounded-2xl overflow-hidden"
                iconButtonClassName="text-blue-600 p-2 mr-1"
                showMoreButtonClassName="px-2 py-3 hover:bg-slate-100 hover:bg-opacity-5 text-blue-500"
                listItemClassName="hover:bg-slate-100 hover:bg-opacity-5 p-2"
                renderListItem={(suggestion) => (
                    <Link href={suggestion?.url??""}>
                        <a className="w-full relative flex justify-start h-16 items-center content-between flex-nowrap flex-row">
                            <div className="w-auto h-full flex justify-center items-center p-2">
                                <div className="rounded-full w-[50px] h-[50px] overflow-hidden">
                                    <Image
                                        src={defaultProfile}
                                        layout="intrinsic"
                                        alt="user profile"
                                        width={50}
                                        height={50}
                                    />
                                </div>
                            </div>
                            <div className="w-full h-full flex justify-center items-center content-center flex-wrap flex-row">
                                <span className="w-full text-sm font-bold text-opacity-75 text-slate-200">
                                    {suggestion?.title ?? ""}
                                </span>
                                <span className="w-full text-xs text-opacity-60 text-slate-300">
                                    {suggestion?.userName ??""}
                                </span>
                            </div>
                            <div className="h-full flex justify-center items-center">
                                <button
                                    type="button"
                                    title="detail"
                                    className="bg-transparent border-none text-sm font-bold text-black bg-slate-100 rounded-full px-3 py-1">
                                    Follow
                                </button>
                            </div>
                        </a>
                    </Link>
                )}
            />
        </div>
    );
}
 
export default FollowSuggestionView;