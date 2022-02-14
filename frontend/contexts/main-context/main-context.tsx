import {Context, useContext} from "react";
import {createContext, FC, useMemo} from "react";

interface IMainContext {}

interface MainContextProviderProps {}

const MainContext: Context<IMainContext> = createContext({});

const MainContextProvider: FC<MainContextProviderProps> = ({children}) => {
    const context: IMainContext = useMemo<IMainContext>(() => ({}), []);
    return (
        <MainContext.Provider value={context}>{children}</MainContext.Provider>
    );
};

export default MainContextProvider;

export const useMainContext = () => {
    const context = useContext<IMainContext>(MainContext);
    if (!context) {
        throw new Error("useMainContext must be used within a MainContextProvider");
    }
    return context;
}