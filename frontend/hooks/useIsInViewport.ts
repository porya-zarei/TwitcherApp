import {RefObject, useEffect, useRef, useState} from "react";

export const useIsInViewport = (
    options: IntersectionObserverInit,
): [RefObject<HTMLDivElement>, boolean] => {
    const [isInViewport, setIsInViewport] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsInViewport(entry.isIntersecting);
        }, options);
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ref, options]);

    return [ref, isInViewport];
};
