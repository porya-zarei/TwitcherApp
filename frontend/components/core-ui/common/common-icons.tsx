import {FC} from "react";
import {HiOutlineRefresh, HiPaperAirplane} from "react-icons/hi";

interface SendIConProps {
    size?: number;
    containerClassName?: string;
    iconClassName?: string;
}

export const SendICon: FC<SendIConProps> = ({
    size,
    containerClassName,
    iconClassName,
}) => {
    return (
        <span className="hidden transition-all translate-x-[200%] group-hover:block group-hover:translate-x-0 animate-pulse">
            <HiPaperAirplane size={size} className="transition-all rotate-90" />
        </span>
    );
};

export const SendIconLoading: FC<SendIConProps> = ({
    size,
    containerClassName,
    iconClassName,
}) => {
    return (
        <span className="transition-all">
            <HiOutlineRefresh size={20} className="animate-spin" />
        </span>
    );
};
