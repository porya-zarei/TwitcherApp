import {Context} from "react";
import {createContext, FC, useMemo} from "react";

interface IMainContext {}

interface MainContextProviderProps {}

export const MainContext: Context<IMainContext> = createContext({});

const MainContextProvider: FC<MainContextProviderProps> = ({children}) => {
    const context: IMainContext = useMemo<IMainContext>(() => ({}), []);
    return (
        <MainContext.Provider value={context}>{children}</MainContext.Provider>
    );
};

export default MainContextProvider;
