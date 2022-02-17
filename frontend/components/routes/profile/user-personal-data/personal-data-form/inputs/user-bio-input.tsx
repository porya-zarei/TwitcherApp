import {FC, useEffect} from "react";
import {HiOutlineRefresh, HiRefresh} from "react-icons/hi";
import {useUserContext} from "../../../../../../contexts/user-context/user-context";
import useHandleableState from "../../../../../../hooks/useHandleableState";
import useNotification from "../../../../../../hooks/useNotification";
import LabeledInput from "../../../../../core-ui/inputs/labeled-input";

interface UserBioInputProps {}

const UserBioInput: FC<UserBioInputProps> = () => {
    const {user, connection, changeUser} = useUserContext();
    const {value, onChange, reset} = useHandleableState("");
    const {notify} = useNotification();
    const isChanged = value !== user?.bio;
    useEffect(() => {
        if (user) {
            reset(user?.bio || "");
        }
    }, []);
    const handleChangeBio = async () => {
        if (connection && user) {
            const successful = await connection.invoke(
                "ChangeUserProfileBio",
                user?.userName,
                value,
            );
            if (successful) {
                changeUser?.((user) => ({
                    ...user,
                    phoneNumber: value,
                }));
                notify("Successfully changed your bio.");
            }
        }
    };
    return (
        <div className="relative w-full flex justify-center items-center p-1">
            <LabeledInput
                labelClassName="text-secondary text-sm"
                className="rounded-md bg-slate-300 bg-opacity-20"
                label="bio">
                <textarea
                    title="bio"
                    rows={3}
                    className="w-full bg-transparent outline-none px-2 pb-1"
                    value={value}
                    onChange={onChange as any}
                />
            </LabeledInput>
            <button
                disabled={!isChanged}
                onClick={handleChangeBio}
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

export default UserBioInput;
