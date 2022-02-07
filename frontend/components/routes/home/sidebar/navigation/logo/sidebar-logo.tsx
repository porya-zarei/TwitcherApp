import Image from "next/image";
import { FC } from "react";
import logo from '../../../../../../assets/images/twitcher-logo.png';
;

interface SidebarLogoProps {
    
}
 
const SidebarLogo: FC<SidebarLogoProps> = () => {
    return (
        <div className="w-full hidden md:flex md:justify-end xl:justify-start content-center items-center">
            <div className="d-inline-block py-2 md:ml-auto xl:m-0">
                <Image src={logo} alt="twitcher logo" layout="intrinsic" height={"40px"} width={"50px"} />
            </div>
        </div>
    );
}
 
export default SidebarLogo;