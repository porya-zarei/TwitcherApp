import {ChangeEvent, FC, useEffect} from "react";
import {HiRefresh} from "react-icons/hi";
import {useUserContext} from "../../../../../../contexts/user-context/user-context";
import useHandleableState from "../../../../../../hooks/useHandleableState";
import useNotification from "../../../../../../hooks/useNotification";
import LabeledInput from "../../../../../core-ui/inputs/labeled-input";

interface UserFullNameInputsProps {}

const UserFullNameInputs: FC<UserFullNameInputsProps> = () => {
    const {user, connection, changeUser} = useUserContext();
    const {notify} = useNotification();
    const {
        value: firstName,
        onChange: onChangeFirstName,
        reset: resetFirstName,
    } = useHandleableState("");
    const {
        value: lastName,
        onChange: onChangeLastName,
        reset: resetLastName,
    } = useHandleableState("");
    useEffect(() => {
        if (user) {
            resetFirstName(user?.firstName || "");
            resetLastName(user?.lastName || "");
        }
    }, [user]);

    const handleChangeFullName = async () => {
        if (connection && user) {
            const successful = await connection.invoke(
                "ChangeUserProfileFullName",
                user?.userName,
                firstName,
                lastName,
            );
            if (successful) {
                changeUser?.((user) => ({
                    ...user,
                    firstName,
                    lastName,
                }));
                notify("Successfully changed your full name.");
            }
        }
    };
    const isChanged =
        firstName !== user?.firstName || lastName !== user.lastName;
    return (
        <div className="relative w-full flex justify-center items-center p-1">
            <LabeledInput
                labelClassName="text-secondary text-sm"
                className="rounded-md bg-slate-300 bg-opacity-20"
                label="first name and last name">
                <input
                    title="first name"
                    className="w-1/2 bg-transparent outline-none px-2 pb-1"
                    value={firstName}
                    onChange={onChangeFirstName}
                    type="text"
                />
                <input
                    title="last name"
                    className="w-1/2 bg-transparent outline-none px-2 pb-1 border-l-2 border-secondary"
                    value={lastName}
                    onChange={onChangeLastName}
                    type="text"
                />
            </LabeledInput>
            <button
                disabled={!isChanged}
                onClick={handleChangeFullName}
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

export default UserFullNameInputs;
