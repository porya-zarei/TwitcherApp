import {FC} from "react";
import {useUserContext} from "../../../../contexts/user-context/user-context";
import useNotification from "../../../../hooks/useNotification";
import {UserStatus as Statuses} from "../../../../types/data/user";

interface UserStatusProps {}

const statusOptions: {
    value: number;
    label: "Happy" | "Busy" | "Successful" | "Failed";
    emoji: string;
}[] = [
    {
        label: "Happy",
        value: 0,
        emoji: "😀",
    },
    {
        label: "Busy",
        value: 1,
        emoji: "🥱",
    },
    {
        label: "Successful",
        value: 2,
        emoji: "😎",
    },
    {
        label: "Failed",
        value: 3,
        emoji: "😩",
    },
];

const UserStatus: FC<UserStatusProps> = () => {
    const {user, connection, changeUser} = useUserContext();
    const {notify} = useNotification();
    const handleClick = (value: number) => {
        return async () => {
            if (value !== user?.status) {
                const successful = await connection?.invoke(
                    "ChangeUserProfileStatus",
                    user?.userName,
                    value,
                );
                if (successful) {
                    const st = statusOptions.find((option) => option.value === value)?.label || user?.statusText;
                    changeUser?.((user) => ({
                        ...user,
                        status: value,
                        statusText: st,
                    }));
                    notify("Status changed successfully");
                }
            }
        };
    };
    return (
        <div className="">
            <div className="relative w-36 h-8 rounded-full flex justify-between items-center bg-dark bg-opacity-70 p-2 group">
                <span className="mx-1">Status: </span>
                <button
                    type="button"
                    className="bg-transparent border-none mx-1">
                    {user?.statusText}
                </button>
                <div className="scale-0 hover:scale-100 group-hover:scale-100 origin-top absolute top-6 left-0 w-full justify-center content-evenly flex-wrap flex-row rounded-md bg-dark overflow-hidden border-2 border-secondary">
                    {statusOptions.map((option) => (
                        <button
                            key={option.label}
                            onClick={handleClick(option.value)}
                            type="button"
                            className={`w-full ${
                                option.value === user?.status
                                    ? "bg-light"
                                    : "bg-transparent"
                            } inline-flex justify-between items-center p-1 hover:bg-light hover:bg-opacity-20 bg-opacity-20`}>
                            <span>{option.label}</span>
                            <span>{option.emoji}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserStatus;
