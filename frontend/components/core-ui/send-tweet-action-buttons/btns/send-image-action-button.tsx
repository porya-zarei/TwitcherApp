import {ChangeEvent, Dispatch, FC, SetStateAction, useRef} from "react";
import { HiOutlinePhotograph } from "react-icons/hi";

interface SendImageActionButtonProps {
    images?: FileList;
    setImages?: Dispatch<SetStateAction<File[]>>;
}

const SendImageActionButton: FC<SendImageActionButtonProps> = ({setImages}) => {
    const imageInputRef = useRef<HTMLInputElement>(null);
    const handleAddImage = () => {
        imageInputRef?.current?.click();
    };
    const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event?.currentTarget?.files && setImages) {
            const images: File[] = Array.from(event.currentTarget.files);
            setImages(images);
        }
    };
    return (
        <button
            onClick={handleAddImage}
            type="button"
            className="border-none bg-transparent text-primary mx-1"
            title={"add photo"}>
            <HiOutlinePhotograph size={23} />
            <input
                className="hidden"
                hidden={true}
                type="file"
                ref={imageInputRef}
                multiple={true}
                accept="image/jpeg, image/png"
                onChange={handleChangeImage}
            />
        </button>
    );
};

export default SendImageActionButton;
