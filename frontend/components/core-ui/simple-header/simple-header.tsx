import {useRouter} from "next/router";
import {FC} from "react";
import {HiArrowLeft, HiOutlineMenuAlt3} from "react-icons/hi";

interface SimpleHeaderProps {
    title: string;
    icon?: JSX.Element;
    withBack?: boolean;
    href?: string;
    containerClassName?: string;
    backButtonClassName?: string;
}

const SimpleHeader: FC<SimpleHeaderProps> = ({
    title,
    icon = <HiOutlineMenuAlt3 className="text-2xl" />,
    withBack,
    href,
    containerClassName,
    backButtonClassName,
}) => {
    const router = useRouter();
    const handleBack = () => {
        if (href) {
            router.push(href);
        } else {
            router.back();
        }
    };
    return (
        <div
            className={`w-full flex justify-between items-center flex-nowrap flex-row ${containerClassName}`}>
            {withBack && (
                <div className="w-auto p-2">
                    <button
                        onClick={handleBack}
                        type="button"
                        title="back"
                        className={`border-none bg-transparent ${backButtonClassName}`}>
                        <HiArrowLeft className="text-2xl" />
                    </button>
                </div>
            )}
            <div
                className={`w-full flex justify-between items-center flex-nowrap flex-row`}>
                <div className="px-3">
                    <h3 className="text-lg">{title}</h3>
                </div>
                <div className="px-3">
                    <button
                        type="button"
                        title="change tweets sorting"
                        className="border-none bg-transparent">
                        {icon}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SimpleHeader;
