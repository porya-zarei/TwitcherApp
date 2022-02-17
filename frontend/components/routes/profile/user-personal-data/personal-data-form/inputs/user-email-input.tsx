import {FC, useEffect} from "react";
import { HiRefresh } from "react-icons/hi";
import {useUserContext} from "../../../../../../contexts/user-context/user-context";
import useHandleableState from "../../../../../../hooks/useHandleableState";
import useNotification from "../../../../../../hooks/useNotification";
import LabeledInput from "../../../../../core-ui/inputs/labeled-input";

interface UserEmailInputProps {}

const UserEmailInput: FC<UserEmailInputProps> = () => {
    const {user,connection,changeUser} = useUserContext();
    const {notify} = useNotification();
    const {value, onChange, reset} = useHandleableState("");
    const isChanged = user?.email !== value;
    useEffect(() => {
        if (user) {
            reset(user?.email || "");
        }
    }, []);
    const handleChangeEmail = async () => {
        if (connection && user) {
            const successful = await connection.invoke(
                "ChangeUserProfileEmail",
                user?.userName,
                value,
            );
            if (successful) {
                changeUser?.((user) => ({
                    ...user,
                    email: value,
                }));
                notify("Successfully changed your email.");
            }
        }
    };
    return (
        <div className="relative w-full flex justify-center items-center p-1">
            <LabeledInput
                labelClassName="text-secondary text-sm"
                className="rounded-md bg-slate-300 bg-opacity-20"
                label="email">
                <input
                    title="email"
                    className="w-full bg-transparent outline-none px-2 pb-1"
                    value={value}
                    onChange={onChange}
                    type="email"
                />
            </LabeledInput>
            <button
                disabled={!isChanged}
                onClick={handleChangeEmail}
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

export default UserEmailInput;
