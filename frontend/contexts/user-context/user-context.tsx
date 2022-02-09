import {
    Context,
    Dispatch,
    SetStateAction,
    useCallback,
    useContext,
} from "react";
import {createContext, FC, useMemo, useState} from "react";
import {PartialUser} from "../../types/data/user";

interface IUserContext {
    user?: PartialUser;
    changeUser?: Dispatch<SetStateAction<PartialUser>>;
    token?: string;
    changeToken?: Dispatch<SetStateAction<string>>;
}

interface UserContextProviderProps {
    initial?: IUserContext;
}

const UserContext: Context<IUserContext> = createContext({});

const UserContextProvider: FC<UserContextProviderProps> = ({
    children,
    initial,
}) => {
    const u: PartialUser = {...(initial?.user ?? ({} as PartialUser))};
    const [user, setUser] = useState<PartialUser>({...u});
    const [token, setToken] = useState<string>(initial?.token ?? "");
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
    const context: IUserContext = useMemo<IUserContext>(
        () => ({
            user,
            changeUser,
            token,
            changeToken,
        }),
        [user, changeUser, token, changeToken],
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
