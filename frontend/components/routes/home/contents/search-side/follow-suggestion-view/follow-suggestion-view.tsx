import Image from "next/image";
import Link from "next/link";
import {FC, useEffect, useState} from "react";
import {HiOutlineCog} from "react-icons/hi";
import SimpleCard from "../../../../../core-ui/simple-card/simple-card";
import defaultProfile from "../../../../../../assets/images/default-profile.png";
import {useSuggestedUsers} from "../../../../../../api/queries/useSuggestedUsers";
import {getUserProfileImage} from "../../../../../../utils/helpers";
import {useFollowUnFollow} from "../../../../../../api/mutations/useFollowUnFollow";
import {useUserContext} from "../../../../../../contexts/user-context/user-context";

interface FollowSuggestionViewProps {}

interface IFollowSuggestion {
    userName?: string;
    title?: string;
    profileImage?: string;
    url?: string;
    onFollow?: () => Promise<void>;
}

const FollowSuggestionView: FC<FollowSuggestionViewProps> = () => {
    const {token, user} = useUserContext();
    const {data} = useSuggestedUsers();
    const [suggestions, setSuggestions] = useState<IFollowSuggestion[]>(
        [] as IFollowSuggestion[],
    );
    const {mutateAsync} = useFollowUnFollow();

    const handleFollowUnFollow = (userName: string) => {
        return async () => {
            const response = await mutateAsync({
                userName,
                token: token || "",
                follow: true,
            });
            console.log("response in follow =>\n", response);
            if (response?.ok) {
                const newSuggestions =
                    data?.result
                        ?.filter(
                            (suggestion) =>
                                suggestion.userName !== userName &&
                                suggestion.userName != user?.userName,
                        )
                        .map(
                            (u) =>
                                ({
                                    userName: u.userName,
                                    title: u.firstName + " " + u.lastName,
                                    profileImage:
                                        (getUserProfileImage(user) as string) ||
                                        "",
                                    url: `/users/${u.userName}`,
                                    onFollow: handleFollowUnFollow(
                                        u.userName || "",
                                    ),
                                } as IFollowSuggestion),
                        ) || ([] as IFollowSuggestion[]);
                console.log("newSuggestions =>\n", newSuggestions);
                setSuggestions(newSuggestions);
            }
        };
    };

    useEffect(() => {
        const suggs =
            data?.result
                ?.filter((u) => u.userName !== user?.userName)
                .map(
                    (u) =>
                        ({
                            userName: u.userName,
                            title: u.firstName + " " + u.lastName,
                            profileImage:
                                (getUserProfileImage(user) as string) || "",
                            url: `/users/${u.userName}`,
                            onFollow: handleFollowUnFollow(u.userName || ""),
                        } as IFollowSuggestion),
                ) || ([] as IFollowSuggestion[]);
        setSuggestions(suggs);
    }, [data]);

    return (
        <div className="w-full flex justify-center items-center">
            <SimpleCard
                icon={<HiOutlineCog size={20} />}
                items={suggestions}
                title="Who to follow"
                containerClassName="bg-secondary bg-opacity-50 rounded-2xl overflow-hidden"
                iconButtonClassName="text-primary p-2 mr-1"
                showMoreButtonClassName="px-2 py-3 hover:bg-slate-100 hover:bg-opacity-5 text-primary"
                listItemClassName="hover:bg-slate-100 hover:bg-opacity-5 p-2"
                renderListItem={(suggestion) => (
                    <div className="w-full relative flex justify-start h-16 items-center content-between flex-nowrap flex-row">
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
                            <Link href={suggestion?.url ?? ""}>
                                <a className="w-full text-sm font-bold text-opacity-75 text-slate-900 dark:text-slate-100 hover:underline">
                                    {suggestion?.title ?? ""}
                                </a>
                            </Link>
                            <span className="w-full text-xs text-opacity-60 text-slate-900 dark:text-slate-200">
                                {suggestion?.userName ?? ""}
                            </span>
                        </div>
                        <div className="h-full flex justify-center items-center">
                            <button
                                type="button"
                                title="detail"
                                onClick={async (e) => {
                                    e.stopPropagation();
                                    await suggestion?.onFollow?.();
                                }}
                                className="bg-transparent border-none text-sm font-bold dark:text-dark dark:bg-slate-100 text-slate-900 bg-dark rounded-full px-3 py-1">
                                Follow
                            </button>
                        </div>
                    </div>
                )}
            />
        </div>
    );
};

export default FollowSuggestionView;
