import {FC} from "react";

interface MainLayoutContainerProps {
    rightSideComponent?: JSX.Element;
    leftSideComponent?: JSX.Element;
}

const MainLayoutContainer: FC<MainLayoutContainerProps> = ({
    leftSideComponent,
    rightSideComponent,
}) => {
    return (
        <div className="w-full flex justify-center relative items-center flex-nowrap flex-row overflow-hidden min-h-screen h-screen">
            <section className="w-full flex justify-evenly relative items-start flex-nowrap flex-row min-h-full h-full overflow-y-scroll custom-scrollbar">
                <div className="w-full flex justify-center items-center md:w-3/5 border-r-[1px] border-secondary h-auto">
                    {leftSideComponent}
                </div>
                <div className="md:w-2/5 h-auto hidden md:flex">
                    {rightSideComponent}
                </div>
            </section>
        </div>
    );
};

export default MainLayoutContainer;
