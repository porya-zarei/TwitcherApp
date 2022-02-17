import {FC, useEffect} from "react";
import { HiRefresh } from "react-icons/hi";
import {useUserContext} from "../../../../../../contexts/user-context/user-context";
import useHandleableState from "../../../../../../hooks/useHandleableState";
import LabeledInput from "../../../../../core-ui/inputs/labeled-input";

interface UserPasswordInputProps {}

const UserPasswordInput: FC<UserPasswordInputProps> = () => {
    const {user} = useUserContext();
    const {value, onChange, reset} = useHandleableState("");
    const isChanged = false;
    return (
        <div className="relative w-full flex justify-center items-center p-1">
            <LabeledInput
                labelClassName="text-secondary text-sm"
                className="rounded-md bg-slate-300 bg-opacity-20"
                label="password">
                <input
                    title="password"
                    className="w-full bg-transparent outline-none px-2 pb-1"
                    value={value}
                    onChange={onChange}
                    type="password"
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

export default UserPasswordInput;
