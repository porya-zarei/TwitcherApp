import {
    HiHome,
    HiUser,
    HiHashtag,
    HiChat,
    HiBookmark,
    HiBell,
    HiDotsHorizontal,
    HiOutlinePencilAlt,
} from "react-icons/hi";

interface IRoute {
    href: string;
    title: string;
    icon: JSX.Element;
    className: string;
    onClick?: () => void;
    iconClassName?: string;
}
export const ROUTES: IRoute[] = [
    {
        title: "Home",
        href: "/home",
        icon: <HiHome className="text-[30px] md:text-[35px]" />,
        className: "flex mt-1",
        iconClassName: "py-2 pr-2",
    },
    {
        title: "Profile",
        href: "/profile",
        icon: <HiUser className="text-[30px] md:text-[35px]" />,
        className: "flex mt-1",
        iconClassName: "py-2 pr-2",
    },
    {
        title: "Explore",
        href: "/explore",
        icon: <HiHashtag className="text-[30px] md:text-[35px]" />,
        className: "flex mt-1",
        iconClassName: "py-2 pr-2",
    },
    {
        title: "Notifications",
        href: "/notifications",
        icon: <HiBell className="text-[30px] md:text-[35px]" />,
        className: "flex mt-1",
        iconClassName: "py-2 pr-2",
    },
    {
        title: "Messages",
        href: "/messages",
        icon: <HiChat className="text-[30px] md:text-[35px]" />,
        className: "hidden md:flex mt-1",
        iconClassName: "py-2 pr-2",
    },
    {
        title: "Bookmarks",
        href: "/bookmarks",
        icon: <HiBookmark className="text-[30px] md:text-[35px]" />,
        className: "hidden md:flex mt-1",
        iconClassName: "py-2 pr-2",
    },
    {
        title: "More",
        href: "/more",
        icon: <HiDotsHorizontal className="text-[30px] md:text-[35px]" />,
        className: "hidden md:flex mt-1",
        iconClassName: "py-2 pr-2",
    },
    {
        title: "Tweet",
        href: "/tweet/new",
        icon: <HiOutlinePencilAlt className="text-[30px] md:text-[35px]" />,
        className: "hidden md:flex mt-1 md:bg-blue-700 md:rounded-full mt-8 md:mt-0 md:px-2",
        iconClassName:
            "rounded-full bg-blue-700 p-3 md:rounded-0 md:bg-transparent md:py-2 md:pr-2 md:pl-0",
        onClick: () => {},
    },
];
