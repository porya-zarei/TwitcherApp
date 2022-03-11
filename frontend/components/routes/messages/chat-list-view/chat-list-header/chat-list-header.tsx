import {FC} from "react";
import {HiMailOpen, HiOutlineCog} from "react-icons/hi";
import SearchView from "../../../../core-ui/search-view/search-view";

interface ChatListHeaderProps {}

const ChatListHeader: FC<ChatListHeaderProps> = () => {
    return (
        <header className="w-full h-[20vh] flex justify-center items-center px-1">
            <div className="w-full h-full flex justify-start items-start content-evenly flex-wrap relative px-1 border-b border-secondary">
                <div className="w-full">
                    <h4 className="w-full text-xl">Messages</h4>
                </div>
                <div className="absolute top-0 right-0 p-1">
                    <button
                        title="setting"
                        type="button"
                        className="w-10 h-10 text-primary text-xl">
                        <HiOutlineCog size={18} />
                    </button>
                    <button
                        title="add"
                        type="button"
                        className="w-10 h-10 text-primary text-xl">
                        <HiMailOpen size={18} />
                    </button>
                </div>
                <div className="w-full p-1 my-auto">
                    <SearchView />
                </div>
            </div>
        </header>
    );
};

export default ChatListHeader;
