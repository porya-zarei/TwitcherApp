import {FC, useEffect} from "react";
import {HiRefresh} from "react-icons/hi";
import {useUserContext} from "../../../../../../contexts/user-context/user-context";
import useHandleableState from "../../../../../../hooks/useHandleableState";
import useNotification from "../../../../../../hooks/useNotification";
import LabeledInput from "../../../../../core-ui/inputs/labeled-input";

interface UserUserNameInputProps {}

const UserUserNameInput: FC<UserUserNameInputProps> = () => {
    const {user, connection, changeUser} = useUserContext();
    const {notify} = useNotification();
    const {value, onChange, reset} = useHandleableState("");
    const isChanged = value !== user?.userName;
    useEffect(() => {
        if (user) {
            reset(user?.userName || "");
        }
    }, []);
    const handleChangeUserName = async () => {
        if (connection && user) {
            const successful = await connection.invoke(
                "ChangeUserProfileUserName",
                user?.userName,
                value,
            );
            if (successful) {
                changeUser?.((user) => ({
                    ...user,
                    userName: value,
                }));
                notify("Successfully changed your username.");
            }
        }
    };
    return (
        <div className="relative w-full flex justify-center items-center p-1">
            <LabeledInput
                labelClassName="text-secondary text-sm"
                className="rounded-md bg-slate-300 bg-opacity-20"
                label="username">
                <input
                    title="username"
                    className="w-full bg-transparent outline-none px-2 pb-1"
                    value={value}
                    onChange={onChange}
                    type="text"
                />
            </LabeledInput>
            <button
                disabled={!isChanged}
                title="press for syncing changed data"
                type="button"
                className={`absolute top-1 right-1 p-1 text-lg ${
                    isChanged
                        ? "text-light animate-spin-left-hover"
                        : "text-secondary"
                }`}>
                <HiRefresh />
            </button>
        </div>
    );
};

export default UserUserNameInput;
