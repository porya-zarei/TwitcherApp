import {FC, useEffect} from "react";
import {HiRefresh} from "react-icons/hi";
import {useUserContext} from "../../../../../../contexts/user-context/user-context";
import useHandleableState from "../../../../../../hooks/useHandleableState";
import useNotification from "../../../../../../hooks/useNotification";
import LabeledInput from "../../../../../core-ui/inputs/labeled-input";

interface UserBirthDayInputProps {}

const stringDateFormat = (date: string) =>
    new Date(date).toLocaleDateString("en");

const UserBirthDayInput: FC<UserBirthDayInputProps> = () => {
    const {user, connection, changeUser} = useUserContext();
    const {notify} = useNotification();
    const {value, onChange, reset} = useHandleableState("");
    useEffect(() => {
        if (user) {
            reset(user?.birthDay || "");
        }
    }, []);
    const isChanged = (user?.birthDay || "") !== stringDateFormat(value);
    console.log(
        "handleChangeBirthDay => ",
        user?.birthDay,
        value,
        stringDateFormat(value),
    );
    const handleChangeBirthDay = async () => {
        if (connection && user) {
            try {
                const successful = await connection.invoke(
                    "ChangeUserProfileBirthDay",
                    user?.userName,
                    value,
                );
                if (successful) {
                    changeUser?.((user) => ({
                        ...user,
                        birthDay: value,
                    }));
                    notify("Successfully changed your birth day.");
                }
            } catch (error) {
                console.error(error);
                notify("Failed to change your birth day.");
            }
        }
    };
    return (
        <div className="relative w-full flex justify-center items-center p-1">
            <LabeledInput
                labelClassName="text-secondary text-sm"
                className="rounded-md bg-slate-300 bg-opacity-20"
                label={`birth day, current : ${user?.birthDay}`}>
                <input
                    title="birth day"
                    className="w-full bg-transparent outline-none px-2 pb-1"
                    onChange={onChange}
                    type="date"
                />
            </LabeledInput>
            <button
                disabled={!isChanged}
                onClick={handleChangeBirthDay}
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

export default UserBirthDayInput;
