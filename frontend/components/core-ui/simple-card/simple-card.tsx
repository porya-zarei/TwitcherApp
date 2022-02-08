import Link from "next/link";
import {HiDotsHorizontal, HiOutlineCog} from "react-icons/hi";
import {getRandomNumber} from "../../../utils/helpers";

interface SimpleCardProps<T> {
    items: T[];
    renderListItem: (item: T, index: number) => JSX.Element;
    showMoreOnClick?: () => void;
    title?: string;
    icon?: JSX.Element;
    iconOnClick?: () => void;
    containerClassName?: string;
    headerClassName?: string;
    mainClassName?: string;
    footerClassName?: string;
    listClassName?: string;
    listItemClassName?: string;
    iconButtonClassName?: string;
    showMoreButtonClassName?: string;
}

const SimpleCard = <T extends object>({
    items=[],
    renderListItem,
    showMoreOnClick,
    title="",
    icon,
    iconOnClick,
    containerClassName="",
    headerClassName="",
    mainClassName="",
    footerClassName="",
    listClassName="",
    listItemClassName="",
    iconButtonClassName="",
    showMoreButtonClassName="",
}: SimpleCardProps<T>) => {
    return (
        <article
            className={`w-full flex justify-center items-center content-start flex-wrap flex-row ${containerClassName}`}>
            <header
                className={`w-full flex justify-between items-center content-start flex-nowrap flex-row ${headerClassName}`}>
                <h1 className="w-full p-2 pt-3 ml-1 text-xl font-bold">
                    {title}
                </h1>
                {icon && (
                    <button
                        type="button"
                        title="setting"
                        onClick={iconOnClick}
                        className={`bg-transparent border-none ${iconButtonClassName}`}>
                        {icon}
                    </button>
                )}
            </header>
            <main
                className={`w-full flex justify-center items-start ${mainClassName}`}>
                <ul
                    className={`w-full flex justify-start items-center flex-wrap flex-row ${listClassName}`}>
                    {items?.map((item, index) => (
                        <li
                            key={getRandomNumber()}
                            className={`w-full flex justify-start items-center flex-nowrap flex-row ${listItemClassName}`}>
                            {renderListItem(item, index)}
                        </li>
                    ))}
                </ul>
            </main>
            <footer className={`w-full ${footerClassName}`}>
                <button
                    type="button"
                    title="more"
                    onClick={showMoreOnClick}
                    className={`w-full bg-transparent border-none ${showMoreButtonClassName}`}>
                    <span className="w-full">Show more</span>
                </button>
            </footer>
        </article>
    );
};

export default SimpleCard;
