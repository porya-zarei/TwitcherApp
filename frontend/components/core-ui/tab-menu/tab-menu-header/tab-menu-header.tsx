import {FC, PropsWithChildren} from "react";
import {TabItemData} from "../tab-menu";

interface TabMenuHeaderProps {
    items: TabItemData[];
    activeTab: number;
    onTabClick: (id: number) => () => void;
}

const TabMenuHeader: FC<TabMenuHeaderProps> = ({
    items,
    activeTab,
    onTabClick,
}) => {
    return (
        <div className="w-full flex justify-evenly items-center flex-nowrap overflow-x-auto border-b border-secondary">
            {items.map((item) => (
                <div
                    onClick={onTabClick(item.id)}
                    key={item.id}
                    className={`flex-1 transition-all cursor-pointer pt-3 px-2 text-lg flex justify-center items-center hover:bg-slate-400 hover:bg-opacity-20 ${
                        activeTab === item.id ? "" : ""
                    }`}>
                    <button
                        type="button"
                        className={`transition-all pb-2 relative ${
                            activeTab === item.id
                                ? "text-white tab-btn-after after:bg-primary"
                                : "text-secondary"
                        }`}>
                        {item.title}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default TabMenuHeader;
