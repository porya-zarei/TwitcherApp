import {
    Context,
    Dispatch,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
} from "react";
import {
    HubConnection,
    HubConnectionBuilder,
    LogLevel,
} from "@microsoft/signalr";
import {createContext, FC, useMemo, useState} from "react";
import {PartialUser} from "../../types/data/user";
import {HUBS} from "../../configs/globals";
import useNotification from "../../hooks/useNotification";
import { useRouter } from "next/router";

interface IUserContext {
    user?: PartialUser;
    changeUser?: Dispatch<SetStateAction<PartialUser>>;
    token?: string;
    changeToken?: Dispatch<SetStateAction<string>>;
    connection?: HubConnection;
}

interface UserContextProviderProps {
    initial?: IUserContext;
}

const UserContext: Context<IUserContext> = createContext({});

const UserContextProvider: FC<UserContextProviderProps> = ({
    children,
    initial,
}) => {
    const {notify} = useNotification();
    const router = useRouter();
    const [user, setUser] = useState<PartialUser>({
        ...{...(initial?.user ?? ({} as PartialUser))},
    });
    const [token, setToken] = useState<string>(String(initial?.token) || "");
    const [connection, setConnection] = useState<HubConnection>(
        {} as HubConnection,
    );
    const changeUser: Dispatch<SetStateAction<PartialUser>> = useCallback(
        (value) => {
            setUser(value);
        },
        [],
    );
    const changeToken: Dispatch<SetStateAction<string>> = useCallback(
        (value) => {
            if (value) {
                setToken(value);
            }
        },
        [],
    );
    useEffect(() => {
        if (
            !router.pathname.includes("login") &&
            !router.pathname.includes("register")
        ) {
            console.log("connecting to hub");
            const userConnection: HubConnection = new HubConnectionBuilder()
                .configureLogging(LogLevel.Trace)
                .withAutomaticReconnect()
                .withUrl(HUBS.users)
                .build();

            userConnection.on("GetUserDataUpdate", (data) => {
                console.log("main User Data => ", data);
                setUser(data);
            });
            userConnection.on("GetNotification", (message) => {
                notify(message);
            });

            userConnection.on("CheckThisUserStatus", (connectionId) => {
                userConnection.send("GetCheckUserStatus", connectionId);
            });

            userConnection.on("ConnectionChecked", (connId) => {
                console.log(connId);
            });

            const onSuccess = async () => {
                console.log("successfull connection", token, userConnection);
                setConnection(userConnection);
            };
            const onReject = () => {
                console.log("rejected connection");
            };
            userConnection.start().then(onSuccess, onReject);
            return () => {
                userConnection?.stop();
            };
        }
    }, []);
    const context: IUserContext = useMemo<IUserContext>(
        () => ({
            user,
            changeUser,
            token,
            changeToken,
            connection,
        }),
        [user, changeUser, token, changeToken, connection],
    );
    return (
        <UserContext.Provider value={context}>{children}</UserContext.Provider>
    );
};

export default UserContextProvider;

export const useUserContext = (): IUserContext => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error(
            "useUserContext must be used within a UserContextProvider",
        );
    }
    return context;
};
