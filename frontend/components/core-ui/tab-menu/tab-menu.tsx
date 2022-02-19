import {FC, useCallback, useMemo, useState} from "react";
import TabMenuHeader from "./tab-menu-header/tab-menu-header";
import TabMenuMain from "./tab-menu-main/tab-menu-main";

export interface TabItemData {
    id: number;
    title: string;
    component: JSX.Element;
}

interface TabMenuProps {
    data: TabItemData[];
}

const TabMenu: FC<TabMenuProps> = ({data = []}) => {
    const [activeTab, setActiveTab] = useState<number>(data[0].id);

    const items = useMemo(() => data, [data]);

    const handleTabClick = useCallback(
        (id: number) => () => {
            setActiveTab(id);
        },
        [data],
    );

    return (
        <article className="w-full flex justify-center content-start flex-wrap flex-row">
            <header className="w-full flex justify-center items-center">
                <TabMenuHeader
                    onTabClick={handleTabClick}
                    activeTab={activeTab}
                    items={items}
                />
            </header>
            <main className="w-full flex justify-center items-center">
                <TabMenuMain items={items} activeTab={activeTab} />
            </main>
        </article>
    );
};

export default TabMenu;
