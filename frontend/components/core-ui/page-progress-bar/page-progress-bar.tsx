import { FC, useState } from "react";
import Router from "next/router";

interface PageProgressBarProps {
    
}
 
const PageProgressBar: FC<PageProgressBarProps> = () => {
    const [animation, setAnimation] = useState<string>("hidden");
    Router.events.on("routeChangeStart", () => {
        console.log("routeChangeStart");
        setAnimation("width-animate");
    });
    Router.events.on("routeChangeComplete", () => {
        console.log("routeChangeComplete");
        setAnimation("hidden");
    });
    return (
        <div className="w-full fixed top-0 bg-transparent left-0 z-30 flex justify-center items-center">
            <div className={`w-full translate-x-[-100%] h-[3px] bg-primary ${animation}`}></div>
        </div>
    );
}
 
export default PageProgressBar;