import Link from "next/link";
import {useRouter} from "next/router";
import {FC} from "react";

interface NavLinkProps {
    href: string;
    className?: string;
    activeClassName?: string;
    onClick?: () => void;
}

const NavLink: FC<NavLinkProps> = ({
    href,
    children,
    className,
    activeClassName,
    onClick,
}) => {
    const router = useRouter();
    const isActive = href === router.pathname;
    const classNames = [className, isActive ? activeClassName : null].join(" ");
    return (
        <Link href={href} passHref={true}>
            <a onClick={onClick} className={classNames}>
                {children}
            </a>
        </Link>
    );
};

export default NavLink;
