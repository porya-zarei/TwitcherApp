import {FC} from "react";
import NavLink from "../../../../../core-ui/navlink/navlink";

interface NavigationListItemProps {
    href: string;
    title: string;
    icon: JSX.Element;
    className: string;
    onClick?: () => void;
    iconClassName?: string;
}

const NavigationListItem: FC<NavigationListItemProps> = ({
    className,
    href,
    icon,
    title,
    onClick,
    iconClassName,
}) => {
    return (
        <NavLink
            className={`w-auto md:w-full ${className} justify-end flex-row flex-wrap xl:justify-start content-center items-center`}
            onClick={onClick}
            href={href}>
            <div className={iconClassName}>{icon}</div>
            <div className="hidden xl:block">{title}</div>
        </NavLink>
    );
};

export default NavigationListItem;
