import {Context} from "react";
import {createContext, FC, useMemo} from "react";

interface MainContextProps {}

interface MainContextProviderProps {}

export const MainContext: Context<MainContextProps> = createContext({});

const MainContextProvider: FC<MainContextProviderProps> = ({children}) => {
    const context: MainContextProps = useMemo<MainContextProps>(() => ({}), []);
    return (
        <MainContext.Provider value={context}>{children}</MainContext.Provider>
    );
};

export default MainContextProvider;
