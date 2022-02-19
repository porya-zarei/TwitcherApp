import {Context, useContext, useState} from "react";
import {createContext, FC, useMemo} from "react";
import {PartialUser} from "../../types/data/user";

interface IUsersPageContext {
    visitedUser?: PartialUser;
}

interface UsersPageContextProviderProps {
    initial?: IUsersPageContext;
}

const UsersPageContext: Context<IUsersPageContext> = createContext({});

const UsersPageContextProvider: FC<UsersPageContextProviderProps> = ({
    children,
    initial,
}) => {
    const [visitedUser, setVisitedUsers] = useState<PartialUser>({
        ...initial?.visitedUser,
    });
    const context: IUsersPageContext = useMemo<IUsersPageContext>(
        () => ({
            visitedUser,
        }),
        [visitedUser],
    );
    return (
        <UsersPageContext.Provider value={context}>
            {children}
        </UsersPageContext.Provider>
    );
};

export default UsersPageContextProvider;

export const useUsersPageContext = (): IUsersPageContext => {
    const context = useContext<IUsersPageContext>(UsersPageContext);
    if (!context) {
        throw new Error(
            "useUsersPageContext must be used within a UsersPageContextProvider",
        );
    }
    return context;
};
