import Image from "next/image";
import Link from "next/link";
import {FC} from "react";
import {HiOutlineCog, HiX} from "react-icons/hi";
import SimpleCard from "../../../core-ui/simple-card/simple-card";
import defaultImage from "../../../../assets/images/default-profile.png";
import {ISerachSuggestion} from "../search-view";

interface SearchSuggestionViewProps {
    suggestions: ISerachSuggestion[];
}

const SearchSuggestionView: FC<SearchSuggestionViewProps> = ({suggestions}) => {
    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-full flex justify-center items-center rounded-2xl bg-dark overflow-hidden border-2 border-primary">
                <SimpleCard
                    icon={<HiOutlineCog size={20} />}
                    items={suggestions}
                    title="Trends for you"
                    containerClassName="bg-secondary bg-opacity-50 rounded-2xl overflow-y-auto overflow-x-hidden max-h-96"
                    iconButtonClassName="text-primary p-2 mr-1"
                    showMoreButtonClassName="px-2 py-3 hover:bg-slate-100 hover:bg-opacity-5 text-primary"
                    listItemClassName="hover:bg-slate-100 hover:bg-opacity-5 p-2"
                    renderListItem={(suggestion) => (
                        <Link href={suggestion.url}>
                            <a className="w-full relative flex justify-start h-16 items-center content-between flex-nowrap flex-row">
                                <div className="w-auto h-full flex justify-center items-center p-2">
                                    <div className="rounded-full w-[50px] h-[50px] overflow-hidden">
                                        <Image
                                            src={defaultImage}
                                            layout="intrinsic"
                                            alt="user profile"
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                </div>
                                <div className="w-full h-full flex justify-center items-center content-center flex-wrap flex-row">
                                    <span className="w-full font-bold text-opacity-75 text-slate-900 dark:text-slate-100">
                                        {suggestion?.title ?? ""}
                                    </span>
                                    <span className="w-full text-xs text-opacity-60 text-slate-900 dark:text-slate-200">
                                        {suggestion?.userName ?? "0"} Tweets
                                    </span>
                                </div>
                                <div className="h-full flex justify-center items-center">
                                    <button
                                        type="button"
                                        title="detail"
                                        className="bg-transparent border-none text-opacity-60 text-slate-900 dark:text-slate-200 hover:text-primary">
                                        <HiX size={20} />
                                    </button>
                                </div>
                            </a>
                        </Link>
                    )}
                />
            </div>
        </div>
    );
};

export default SearchSuggestionView;
