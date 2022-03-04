import {
    ChangeEventHandler,
    Dispatch,
    FC,
    SetStateAction,
    useState,
} from "react";
import {HiSearch} from "react-icons/hi";
import {PartialUser} from "../../../../types/data/user";
import {ISerachSuggestion} from "../search-view";

interface SearchInputViewProps {
    data: PartialUser[];
    setSuggestions: Dispatch<SetStateAction<ISerachSuggestion[]>>;
}

const SearchInputView: FC<SearchInputViewProps> = ({data, setSuggestions}) => {
    const [searchText, setSearchText] = useState<string>("");

    const handleChangeSearchText: ChangeEventHandler<HTMLInputElement> = (
        event,
    ) => {
        const text = event.target.value;
        setSearchText(text);
        filterSuggestions(text);
    };

    const filterSuggestions = (text: string) => {
        const suggs = data
            .filter((user) => {
                const texts = `${user.firstName} ${user.lastName} ${user.userName} ${user.email} ${user.bio}`;
                return texts.toLowerCase().includes(text.toLowerCase());
            })
            .map((user) => ({
                title: `${user.firstName} ${user.lastName}`,
                imageUrl: (user.profileImage as string) || "",
                url: `users/${user.userName}`,
                userName: user.userName || "",
            })) as ISerachSuggestion[];
        setSuggestions(suggs);
    };

    return (
        <div className="w-full h-full flex justify-between items-center rounded-full bg-secondary bg-opacity-70 peer">
            <button
                type="button"
                title="search"
                className="border-none bg-transparent flex justify-center items-center p-3">
                <HiSearch size={25} />
            </button>
            <div className="w-full h-10 flex justify-between items-center flex-nowrap flex-row p-1">
                <input
                    className="w-full h-full bg-transparent border-none outline-none p-2"
                    type="text"
                    placeholder="Search twitcher"
                    value={searchText}
                    onChange={handleChangeSearchText}
                />
            </div>
        </div>
    );
};

export default SearchInputView;
