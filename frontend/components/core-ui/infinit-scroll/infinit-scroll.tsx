import {
    FC,
    LegacyRef,
    RefObject,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import {getRandomNumber} from "../../../utils/helpers";

interface UseInfinitScrollProps<T, U> {
    items: T[];
    renderItem: (item: T) => JSX.Element;
    loadMore: () => Promise<U | void>;
    hasMore: boolean;
    loader?: JSX.Element;
    isList?: boolean;
    containerClassName?: string;
    listClassName?: string;
    itemContainerClassName?: string;
}

interface UseInfinitScrollOutput {
    containerRef: RefObject<HTMLElement>;
    observer: LegacyRef<IntersectionObserver>;
    isLoading: boolean;
    view: JSX.Element;
    currentPage: number;
}

const getObserver = (element: HTMLElement, callback: () => void) => {
    const observer = new IntersectionObserver(
        (entries) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                callback();
            }
        },
        {
            root: null,
            rootMargin: "20px",
            threshold: 1.0,
        },
    );
    observer.observe(element);
    return observer;
};

const useInfinitScroll = <T, U = void>({
    items,
    loadMore,
    renderItem,
    hasMore,
    loader,
    isList = false,
    containerClassName = "",
    listClassName = "",
    itemContainerClassName = "",
}: UseInfinitScrollProps<T, U>): UseInfinitScrollOutput => {
    const containerRef = useRef(null);
    const observer = useRef<IntersectionObserver | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(0);
    useEffect(() => {
        if (containerRef.current && hasMore) {
            observer.current = getObserver(containerRef.current, () => {
                !isLoading && setIsLoading(true);
                loadMore();
                setCurrentPage((p) => p + 1);
                isLoading && setIsLoading(false);
            });
        }
        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [containerRef, hasMore, loadMore]);
    const view = useMemo(
        () => (
            <div
                className={`${containerClassName} w-full flex justify-center items-center`}>
                {isList ? (
                    <ul className={`${listClassName}`} ref={containerRef}>
                        {items.map((item) => (
                            <li
                                className={`${itemContainerClassName}`}
                                key={getRandomNumber()}>
                                {renderItem(item)}
                            </li>
                        ))}
                        {isLoading && <li>{loader}</li>}
                    </ul>
                ) : (
                    <div className={listClassName} ref={containerRef}>
                        {items.map((item) => (
                            <div
                                className={`${itemContainerClassName}`}
                                key={getRandomNumber()}>
                                {renderItem(item)}
                            </div>
                        ))}
                        {isLoading && <div>{loader}</div>}
                    </div>
                )}
            </div>
        ),
        [items],
    );
    return {
        view,
        containerRef,
        isLoading,
        observer,
        currentPage,
    };
};

export default useInfinitScroll;
