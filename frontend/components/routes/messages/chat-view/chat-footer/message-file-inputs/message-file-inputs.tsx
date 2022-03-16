import {ChangeEvent, FC, MouseEvent, RefObject} from "react";
import {HiPhotograph, HiVideoCamera} from "react-icons/hi";

interface MessageFileInputsProps {
    fileInputRef: RefObject<HTMLInputElement>;
    imageInputRef: RefObject<HTMLInputElement>;
    videoInputRef: RefObject<HTMLInputElement>;
    voiceInputRef: RefObject<HTMLInputElement>;
}

const MessageFileInputs: FC<MessageFileInputsProps> = ({
    fileInputRef,
    imageInputRef,
    videoInputRef,
    voiceInputRef,
}) => {
    const handleButtonClick =
        (type: "FILE" | "IMAGE" | "VIDEO") =>
        (event: MouseEvent<HTMLButtonElement>) => {
            if (type === "FILE") {
                fileInputRef.current?.click();
            } else if (type === "IMAGE") {
                imageInputRef.current?.click();
            } else if (type === "VIDEO") {
                videoInputRef.current?.click();
            }
        };
    return (
        <div className="h-full inline-flex justify-evenly items-center p-2">
            <button
                title="select image"
                onClick={handleButtonClick("IMAGE")}
                type="button"
                className="mx-1 text-primary">
                <HiPhotograph size={20} />
                <input
                    hidden={true}
                    className="hidden"
                    type="file"
                    ref={imageInputRef}
                    accept="image/*"
                />
            </button>
            <button
                title="select video"
                onClick={handleButtonClick("VIDEO")}
                type="button"
                className="mx-1 text-primary">
                <HiVideoCamera size={20} />
            </button>
        </div>
    );
};

export default MessageFileInputs;
