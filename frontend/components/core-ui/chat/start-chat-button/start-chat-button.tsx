import {FC, MouseEvent, MouseEventHandler} from "react";
import {HiOutlineMailOpen} from "react-icons/hi";
import {useStartChatUser} from "../../../../api/mutations/useStartChatUser";
import {useUserContext} from "../../../../contexts/user-context/user-context";
import useNotification from "../../../../hooks/useNotification";
import {IStartChatUser} from "../../../../types/data/chat";

interface StartChatButtonProps {
    userName: string;
}

const StartChatButton: FC<StartChatButtonProps> = ({userName}) => {
    const {mutateAsync} = useStartChatUser();
    const {user, token} = useUserContext();
    const {notify} = useNotification();
    const handleStartChat = (userName: string) => {
        const handler: MouseEventHandler<HTMLButtonElement> = async (e) => {
            e.preventDefault();
            e.stopPropagation();
            const data: IStartChatUser = {
                token: token || "",
                creatorUserName: user?.userName || "",
                title: `${user?.userName} and ${userName}`,
                userNames: [userName],
            };
            const {result, message} = await mutateAsync(data);
            if (result) {
                notify("Chat started successfully | See Messages");
            } else {
                notify("your chat could not be started");
                notify(message);
            }
        };
        return handler;
    };
    return (
        <button
            type="button"
            title="detail"
            onClick={handleStartChat(userName)}
            className="bg-transparent border-none text-opacity-60 text-slate-900 dark:text-slate-200 hover:text-primary">
            <HiOutlineMailOpen size={20} />
        </button>
    );
};

export default StartChatButton;
