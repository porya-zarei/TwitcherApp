import {FC} from "react";
import { HiOutlineChartBar } from "react-icons/hi";

interface SendPollActionButtonProps {}

const SendPollActionButton: FC<SendPollActionButtonProps> = () => {
    return (
        <button
            onClick={() => {}}
            type="button"
            className="border-none bg-transparent text-primary mx-1"
            title="add poll">
            <HiOutlineChartBar size={23} />
        </button>
    );
};

export default SendPollActionButton;
