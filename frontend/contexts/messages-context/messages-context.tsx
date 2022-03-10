import {initial} from "cypress/types/lodash";
import {
    Context,
    Dispatch,
    SetStateAction,
    useCallback,
    useContext,
    useState,
} from "react";
import {createContext, FC, useMemo} from "react";
import {PartialChat} from "../../types/data/chat";

interface IMessagesContext {
    chats?: PartialChat[];
    filteredChats?: PartialChat[];
    changeFilteredChats?: Dispatch<SetStateAction<PartialChat[]>>;
}

interface MessagesContextProviderProps {
    initial: IMessagesContext;
}

const MessagesContext = createContext<IMessagesContext>({});

const MessagesContextProvider: FC<MessagesContextProviderProps> = ({
    children,
    initial,
}) => {
    const [filteredChats, setFilteredChats] = useState<PartialChat[]>([
        ...(initial.chats ?? []),
    ]);
    const changeFilteredChats = useCallback<
        Dispatch<SetStateAction<PartialChat[]>>
    >((value) => {
        setFilteredChats(value);
    }, []);
    const context: IMessagesContext = useMemo<IMessagesContext>(
        () => ({
            chats: initial.chats,
            filteredChats,
            changeFilteredChats,
        }),
        [initial, filteredChats, changeFilteredChats],
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
