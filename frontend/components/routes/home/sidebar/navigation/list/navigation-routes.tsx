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
export const routes: IRoute[] = [
    {
        title: "Home",
        href: "/",
        icon: <HiHome className="text-[30px] md:text-[40px]" />,
        className: "flex",
        iconClassName: "py-2 pr-2",
    },
    {
        title: "Profile",
        href: "/profile",
        icon: <HiUser className="text-[30px] md:text-[40px]" />,
        className: "flex",
        iconClassName: "py-2 pr-2",
    },
    {
        title: "Explore",
        href: "/explore",
        icon: <HiHashtag className="text-[30px] md:text-[40px]" />,
        className: "flex",
        iconClassName: "py-2 pr-2",
    },
    {
        title: "Notifications",
        href: "/notifications",
        icon: <HiBell className="text-[30px] md:text-[40px]" />,
        className: "flex",
        iconClassName: "py-2 pr-2",
    },
    {
        title: "Messages",
        href: "/messages",
        icon: <HiChat className="text-[30px] md:text-[40px]" />,
        className: "hidden md:flex",
        iconClassName: "py-2 pr-2",
    },
    {
        title: "Bookmarks",
        href: "/bookmarks",
        icon: <HiBookmark className="text-[30px] md:text-[40px]" />,
        className: "hidden md:flex",
        iconClassName: "py-2 pr-2",
    },
    {
        title: "More",
        href: "/more",
        icon: <HiDotsHorizontal className="text-[30px] md:text-[40px]" />,
        className: "hidden md:flex",
        iconClassName: "py-2 pr-2",
    },
    {
        title: "Tweet",
        href: "/tweet/new",
        icon: <HiOutlinePencilAlt className="text-[30px] md:text-[40px]" />,
        className: "hidden md:flex mt-8 md:mt-0",
        iconClassName:
            "rounded-full bg-blue-700 p-3 md:rounded-0 md:bg-transparent md:py-2 md:pr-2 md:pl-0",
        onClick: () => {},
    },
];
