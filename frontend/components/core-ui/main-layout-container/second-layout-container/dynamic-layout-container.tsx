import {FC} from "react";

interface DynamicLayoutContainerProps {
    rightSideComponent?: JSX.Element;
    leftSideComponent?: JSX.Element;
    leftSideWidth?: string;
    rightSideWidth?: string;
    hiddenSide?: "left" | "right";
}

const DynamicLayoutContainer: FC<DynamicLayoutContainerProps> = ({
    leftSideComponent,
    rightSideComponent,
    leftSideWidth = "md:w-3/5",
    rightSideWidth = "md:w-2/5",
    hiddenSide = "right",
}) => {
    return (
        <div className="w-full flex justify-center relative items-center flex-nowrap flex-row overflow-hidden min-h-screen h-screen">
            <section className="w-full flex justify-evenly relative items-start flex-nowrap flex-row min-h-full h-full overflow-y-scroll custom-scrollbar">
                <div
                    className={`${
                        hiddenSide === "left" ? "hidden md:flex" : "flex w-full"
                    } justify-center items-center ${leftSideWidth} border-r-[1px] border-secondary h-auto`}>
                    {leftSideComponent}
                </div>
                <div
                    className={`${rightSideWidth} h-auto ${
                        hiddenSide === "right" ? "hidden md:flex" : "flex w-full"
                    } md:flex`}>
                    {rightSideComponent}
                </div>
            </section>
        </div>
    );
};

export default DynamicLayoutContainer;
