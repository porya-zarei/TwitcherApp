import {useCallback} from "react";
import {toast, ToastOptions, TypeOptions} from "react-toastify";

interface IUseNotification {
    (initial?: IUseNotificationProps): IUseNotificationResult;
}

interface IUseNotificationProps {
    type?: TypeOptions;
    theme?: "dark" | "light" | "colored";
}

interface IUseNotificationResult {
    notify: (message: string, options?: ToastOptions<{}>) => void;
}

const useNotification: IUseNotification = (
    initial = {type: "default", theme: "dark"},
) => {
    const notify: IUseNotificationResult["notify"] = useCallback(
        (message, options) => {
            if (options) {
                toast(message, options);
            } else {
                toast(message, {
                    type: initial.type,
                    position: "top-left",
                    autoClose: 5000,
                    theme: initial.theme,
                });
            }
        },
        [initial],
    );
    return {notify};
};

export default useNotification;
