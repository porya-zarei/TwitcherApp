import {Context, memo, useCallback, useContext, useMemo} from "react";

type IUseContextSelector<U> = U;

const useContextSelector = <T, U>(
    ctx: Context<T>,
    slctr: (data: T) => U,
): IUseContextSelector<U> => {
    const context = useMemo(() => ctx, [ctx]);
    const selector = useCallback(slctr, [slctr]);
    const state = selector(useContext(context));
    return state;
};

export default memo(useContextSelector);
