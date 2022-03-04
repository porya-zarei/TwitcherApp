import dynamic from "next/dynamic";
import {FC, useEffect, useState} from "react";
import {useSuggestedUsers} from "../../../api/queries/useSuggestedUsers";
import {getUserProfileImage} from "../../../utils/helpers";
import SearchInputView from "./search-view-input/search-input-view";

export interface ISerachSuggestion {
    title: string;
    url: string;
    imageUrl: string;
    userName: string;
}

interface SearchViewProps {}

const SearchSuggestionView = dynamic(
    () => import("./search-suggestion-view/search-suggestion"),
    {ssr: false},
);

const SearchView: FC<SearchViewProps> = () => {
    const {data, refetch} = useSuggestedUsers();
    const [suggestions, setSuggestions] = useState<ISerachSuggestion[]>(
        [] as ISerachSuggestion[],
    );
    useEffect(() => {
        const suggs =
            data?.result?.map(
                (user) =>
                    ({
                        title: user?.firstName + " " + user?.lastName || "",
                        imageUrl: (getUserProfileImage(user) as string) || "",
                        url: `users/${user.userName}`,
                        userName: user?.userName || "",
                    } as ISerachSuggestion),
            ) || ([] as ISerachSuggestion[]);
        setSuggestions(suggs);
    }, [data]);
    return (
        <div className="w-full relative h-full flex justify-center items-center flex-nowrap flex-row bg-dark bg-opacity-50 backdrop-blur-md px-2 py-1">
            <SearchInputView
                data={data?.result ?? []}
                setSuggestions={setSuggestions}
            />
            <div className="w-full absolute top-[40px] left-0 z-20 hidden peer-hover:flex hover:flex justify-center items-center">
                <div className="w-full overflow-y-auto overflow-x-hidden">
                    <SearchSuggestionView suggestions={suggestions} />
                </div>
            </div>
        </div>
    );
};

export default SearchView;
