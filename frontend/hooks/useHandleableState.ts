import {
    ChangeEventHandler,
    Dispatch,
    SetStateAction,
    useCallback,
    useMemo,
    useState,
} from "react";
type ST = string | number | boolean;

interface useHandleableStateType<U> {
    value: U;
    onChange: ChangeEventHandler<HTMLInputElement>;
    update: Dispatch<SetStateAction<U>>;
    reset: (reset: U) => void;
}
function useHandleableState<T = ST>(
    initialValue: T,
): useHandleableStateType<T> {
    const [state, setState] = useState<T>(initialValue);
    const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
        (event) => {
            if (typeof state === "number") {
                setState(Number(event.target.value) as number & T);
            } else if (typeof state === "boolean") {
                setState(!!event.target.checked as boolean & T);
            } else if (typeof state === "string") {
                setState(event.target.value as string & T);
            } else {
                throw new TypeError("type not supported");
            }
        },
        [],
    );
    const handleUpdate = useCallback<(newState: SetStateAction<T>) => void>(
        (newState) => {
            if (
                typeof newState === typeof state ||
                typeof newState === "function"
            ) {
                setState(newState);
            } else {
                throw new TypeError("type not supported");
            }
        },
        [],
    );
    const handleReset = useCallback<(reset: T) => void>((reset) => {
        if (typeof state === "number") {
            setState((reset ?? 0) as number & T);
        } else if (typeof state === "boolean") {
            setState((reset ?? false) as boolean & T);
        } else if (typeof state === "string") {
            setState((reset ?? "") as string & T);
        } else {
            throw new TypeError("type not supported");
        }
    }, []);

    return useMemo(
        () => ({
            value: state,
            onChange: handleChange,
            update: handleUpdate,
            reset: handleReset,
        }),
        [state, handleChange, handleUpdate, handleReset],
    ) as useHandleableStateType<T>;
}

export default useHandleableState;
