import Link from "next/link";
import {FC} from "react";

import {HiOutlineCog, HiDotsHorizontal} from "react-icons/hi";
import SimpleCard from "../../core-ui/simple-card/simple-card";

interface TrendsViewProps {}

interface ITrend {
    title: string;
    description: string;
    url: string;
    tweetsCount: number;
}

const TRENDS: ITrend[] = [
    {
        title: "Trending 1",
        description: "Trending 1 description",
        url: "/trends/trending-1",
        tweetsCount: 20,
    },
    {
        title: "Trending 2",
        description: "Trending 2 description",
        url: "/trends/trending-2",
        tweetsCount: 2000,
    },
    {
        title: "Trending 3",
        description: "Trending 3 description",
        url: "/trends/trending-3",
        tweetsCount: 200,
    },
    {
        title: "Trending 4",
        description: "Trending 4 description",
        url: "/trends/trending-4",
        tweetsCount: 35600,
    },
];

const TrendsView: FC<TrendsViewProps> = () => {
    return (
        <div className="w-full flex justify-center items-center">
            <SimpleCard
                icon={<HiOutlineCog size={20} />}
                items={TRENDS}
                title="Trends for you"
                containerClassName="bg-secondary bg-opacity-50 rounded-2xl overflow-hidden"
                iconButtonClassName="text-primary p-2 mr-1"
                showMoreButtonClassName="px-2 py-3 hover:bg-slate-100 hover:bg-opacity-5 text-primary"
                listItemClassName="hover:bg-slate-100 hover:bg-opacity-5 p-2"
                renderListItem={(trend) => (
                    <Link href={trend.url}>
                        <a className="w-full relative flex justify-start h-16 items-center content-between flex-wrap flex-row">
                            <span className="absolute top-1 right-1">
                                <button
                                    type="button"
                                    title="detail"
                                    className="bg-transparent border-none text-opacity-60 dark:text-slate-200 text-slate-900 hover:text-primary">
                                    <HiDotsHorizontal size={20} />
                                </button>
                            </span>
                            <span className="w-full text-xs text-opacity-60 dark:text-slate-200 text-slate-900">
                                {trend?.title ?? ""}
                            </span>
                            <span className="w-full font-bold text-opacity-75 dark:text-slate-100 text-slate-900">
                                {trend?.description ?? ""}
                            </span>
                            <span className="w-full text-xs text-opacity-60 dark:text-slate-200 text-slate-900">
                                {trend?.tweetsCount ?? "0"} Tweets
                            </span>
                        </a>
                    </Link>
                )}
            />
        </div>
    );
};

export default TrendsView;
