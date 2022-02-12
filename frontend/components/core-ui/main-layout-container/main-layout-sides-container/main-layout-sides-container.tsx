import {FC} from "react";

interface MainLayoutSidesContaierProps {
    headerComponent: JSX.Element;
    mainComponent: JSX.Element;
    containerClassName?: string;
    headerContainerClassName?: string;
    mainContainerClassName?: string;
}

const MainLayoutSidesContaier: FC<MainLayoutSidesContaierProps> = ({
    headerComponent,
    mainComponent,
    headerContainerClassName = "",
    mainContainerClassName = "",
    containerClassName = "",
}) => {
    return (
        <section
            className={`w-full flex justify-center items-center content-start flex-wrap flex-row relative ${containerClassName}`}>
            <header
                className={`w-full flex justify-center items-center sticky top-0 z-10 ${headerContainerClassName}`}>
                {headerComponent}
            </header>
            <main
                className={`w-full flex justify-center items-center content-start ${mainContainerClassName}`}>
                {mainComponent}
            </main>
        </section>
    );
};

export default MainLayoutSidesContaier;
