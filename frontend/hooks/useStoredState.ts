import {useEffect, useState} from "react";

export const useStoredState = <T>(key: string, initial: T) => {

    const [state, setState] = useState<T>(() => {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) as T : initial;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
        const handleChange = (e: StorageEvent) => {
            if (e.key === key) {
                setState(JSON.parse(e.newValue as string) as T);
            }
        };
        window.addEventListener("storage", handleChange);
        return () => window.removeEventListener("storage", handleChange);
    }, [key, state]);

    return [state, setState];
    
};
