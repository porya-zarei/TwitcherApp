import {FC} from "react";
import {HiOutlineCalendar, HiOutlineFilm} from "react-icons/hi";

interface SendEventActionButtonProps {}

const SendEventActionButton: FC<SendEventActionButtonProps> = () => {
    return (
        <button
            onClick={() => {}}
            type="button"
            className="border-none bg-transparent text-primary mx-1"
            title="add event">
            <HiOutlineCalendar size={23} />
        </button>
    );
};

export default SendEventActionButton;
