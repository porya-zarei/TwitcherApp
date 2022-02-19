import {FC} from "react";
import {TabItemData} from "../tab-menu";

interface TabMenuMainProps {
    items: TabItemData[];
    activeTab: number;
}

const TabMenuMain: FC<TabMenuMainProps> = ({items, activeTab}) => {
    return (
        <div className="w-full flex justify-center items-start">
            {items.map((item) => (
                <div
                    key={item.id}
                    className={`w-full ${
                        item.id === activeTab ? "flex" : "hidden"
                    } items-center justify-center`}>
                    {item.component}
                </div>
            ))}
        </div>
    );
};

export default TabMenuMain;
