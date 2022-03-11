import {
    Dispatch,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import {createContext, FC, useMemo} from "react";
import {PartialChat} from "../../types/data/chat";
import {PartialMessage} from "../../types/data/message";
import {PartialUser} from "../../types/data/user";
import {getOtherUser} from "../../utils/helpers";
import {useUserContext} from "../user-context/user-context";

interface IMessagesContext {
    chats?: PartialChat[];
    filteredChats?: PartialChat[];
    changeFilteredChats?: Dispatch<SetStateAction<PartialChat[]>>;
    selectedChat?: PartialChat;
    changeSelectedChat?: Dispatch<SetStateAction<PartialChat>>;
    isMobile?: boolean;
    setIsMobile?: Dispatch<SetStateAction<boolean>>;
    isInChat?: boolean;
    setIsInChat?: Dispatch<SetStateAction<boolean>>;
}

interface MessagesContextProviderProps {
    initial: IMessagesContext;
}

const MessagesContext = createContext<IMessagesContext>({});

const MessagesContextProvider: FC<MessagesContextProviderProps> = ({
    children,
    initial,
}) => {
    const {connection} = useUserContext();
    const [chats, setChats] = useState<PartialChat[]>([
        ...(initial.chats ?? []),
    ]);

    // const changeChats = useCallback<Dispatch<SetStateAction<PartialChat[]>>>(
    //     (value) => {
    //         setChats(value);
    //     },
    //     [],
    // );
    const [filteredChats, setFilteredChats] = useState<PartialChat[]>([
        ...(initial.chats ?? []),
    ]);
    const changeFilteredChats = useCallback<
        Dispatch<SetStateAction<PartialChat[]>>
    >((value) => {
        setFilteredChats(value);
    }, []);

    const [selectedChat, setSelectedChat] = useState<PartialChat>({
        ...initial?.chats?.[0],
    });

    const changeSelectedChat = useCallback<
        Dispatch<SetStateAction<PartialChat>>
    >((value) => {
        console.log("changeSelectedChat =>", value);
        setSelectedChat(value);
    }, []);

    // const changeSelectedChat = (value: SetStateAction<PartialChat>) => {
    //     console.log("changeSelectedChat =>", value);
    //     setSelectedChat(value);
    // };

    const [isMobile, setIsMobile] = useState(initial?.isMobile ?? false);
    const [isInChat, setIsInChat] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 900);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    useEffect(() => {
        if (connection && connection.on) {
            connection.on("ChatCreated", (chat: PartialChat) => {
                setChats((p) => [...p, chat]);
            });
            connection.on("MessageArrived", (message: PartialMessage) => {
                console.log("MessageArrived => ", message);
                const oldChats = chats.map((c) => ({...c}));
                const chat = oldChats.find(
                    (c) => c?.chatId === message?.chatId,
                );
                if (chat && chat.messages) {
                    chat.messages = [...(chat?.messages || []), message];
                    setChats([...oldChats]);
                } else {
                    setChats([...oldChats, {...chat, messages: [message]}]);
                }
            });
        }
    }, [connection]);
    const context: IMessagesContext = useMemo<IMessagesContext>(
        () => ({
            chats,
            filteredChats,
            changeFilteredChats,
            selectedChat,
            changeSelectedChat,
            isMobile,
            setIsMobile,
            isInChat,
            setIsInChat,
        }),
        [
            chats,
            filteredChats,
            changeFilteredChats,
            selectedChat,
            changeSelectedChat,
            isMobile,
            setIsMobile,
            isInChat,
            setIsInChat,
        ],
    );
    return (
        <MessagesContext.Provider value={context}>
            {children}
        </MessagesContext.Provider>
    );
};

export default MessagesContextProvider;

export const useMessagesContext = (): IMessagesContext => {
    const context = useContext<IMessagesContext>(MessagesContext);
    if (!context) {
        throw new Error(
            "useMessagesContext must be used within a MessagesContextProvider",
        );
    }
    return context;
};
