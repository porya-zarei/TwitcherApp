import { FC } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";

interface SendLocationActionButtonProps {
    
}
 
const SendLocationActionButton: FC<SendLocationActionButtonProps> = () => {
    return (
        <button
            onClick={() => {}}
            type="button"
            className="border-none bg-transparent text-primary mx-1"
            title="add location">
            <HiOutlineLocationMarker size={23} />
        </button>
    );
}
 
export default SendLocationActionButton;