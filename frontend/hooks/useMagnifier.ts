import {
    MouseEvent as ME,
    RefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

interface IUseMagnifierResult {
    isMagnifying: boolean;
    containerRef: RefObject<HTMLDivElement>;
    imageRef: RefObject<HTMLImageElement>;
    sibilingRef: RefObject<HTMLDivElement>;
    handleMouseMove: (e: ME<HTMLDivElement, MouseEvent>) => void;
    handleMouseLeave: () => void;
    handleMouseEnter: () => void;
    initialize: () => void;
}

export const useMagnifier = (scale: number = 1.5): IUseMagnifierResult => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const sibilingRef = useRef<HTMLDivElement>(null);
    const [isMagnifying, setIsMagnifying] = useState(false);

    const handleMouseMove = (e: ME<HTMLDivElement, MouseEvent>) => {
        if (containerRef.current && sibilingRef.current) {
            const {pageX, pageY} = e;
            const xOffset = pageX - containerRef.current.offsetLeft;
            const yOffset = pageY - containerRef.current.offsetTop;
            const transformOrigin = `${xOffset}px ${yOffset}px`;
            sibilingRef.current.style.transformOrigin = transformOrigin;
            sibilingRef.current.style.transform = `scale(${scale})`;
        }
    };

    const handleMouseLeave = () => {
        sibilingRef.current &&
            (sibilingRef.current.style.transformOrigin = "0 0");
        setIsMagnifying(false);
    };
    const handleMouseEnter = () => {
        setIsMagnifying(true);
    };
    const initialize = useCallback(() => {
        if (!imageRef.current && containerRef.current && sibilingRef.current) {
            imageRef.current = containerRef.current.querySelector("img");
            if (imageRef.current) {
                const imgClone = document.createElement("img");
                imgClone.src = imageRef.current.src;
                imgClone.className = "w-full h-full z-0";
                console.log("img clone => ", imgClone, imageRef.current);
                sibilingRef.current.innerHTML = "";
                sibilingRef.current.appendChild(imgClone);
                sibilingRef.current.style.transform = `scale(${scale})`;
            }
        } else if (sibilingRef.current && imageRef.current) {
            const imgClone = imageRef.current.cloneNode(
                true,
            ) as HTMLImageElement;
            imgClone.style.zIndex = "1";
            sibilingRef.current.innerHTML = "";
            sibilingRef.current.appendChild(imgClone);
            sibilingRef.current.style.transform = `scale(${scale})`;
        }
    }, [scale]);
    useEffect(() => {
        initialize();
    }, [scale]);

    return {
        containerRef,
        imageRef,
        sibilingRef,
        isMagnifying,
        handleMouseMove,
        handleMouseLeave,
        handleMouseEnter,
        initialize,
    };
};
