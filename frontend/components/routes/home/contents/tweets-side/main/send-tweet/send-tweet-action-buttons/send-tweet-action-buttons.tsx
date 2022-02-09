import { ChangeEvent, Dispatch, FC, SetStateAction, useRef } from "react";
import {
    HiOutlinePhotograph,
    HiOutlineCalendar,
    HiOutlineFilm,
    HiOutlineEmojiHappy,
    HiOutlineLocationMarker,
    HiOutlineChartBar,
} from "react-icons/hi";

interface SendTweetActionButtonsProps {
    images?: FileList;
    setImages?: Dispatch<SetStateAction<File[]>>;
}

const SendTweetActionButtons: FC<SendTweetActionButtonsProps> = ({setImages}) => {
    const imageInputRef = useRef<HTMLInputElement>(null);
    const handleAddImage = () => {
        imageInputRef?.current?.click();
    }
    const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event?.target?.files && setImages) {
            const images:File[] = Array.from(event.target.files);
            setImages(images);
        }
    }
    return (
        <div className="w-full">
            <button
                onClick={handleAddImage}
                type="button"
                className="border-none bg-transparent text-blue-600 mx-1"
                title={"add photo"}>
                <HiOutlinePhotograph size={23} />
                <input className="hidden" hidden={true} type="file" ref={imageInputRef} multiple={true} accept="image/jpeg, image/png" onChange={handleChangeImage} />
            </button>
            <button
                onClick={() => {}}
                type="button"
                className="border-none bg-transparent text-blue-600 mx-1"
                title="add video">
                <HiOutlineCalendar size={23} />
            </button>
            <button
                onClick={() => {}}
                type="button"
                className="border-none bg-transparent text-blue-600 mx-1"
                title="add event">
                <HiOutlineFilm size={23} />
            </button>
            <button
                onClick={() => {}}
                type="button"
                className="border-none bg-transparent text-blue-600 mx-1"
                title="add emoji">
                <HiOutlineEmojiHappy size={23} />
            </button>
            <button
                onClick={() => {}}
                type="button"
                className="border-none bg-transparent text-blue-600 mx-1"
                title="add location">
                <HiOutlineLocationMarker size={23} />
            </button>
            <button
                onClick={() => {}}
                type="button"
                className="border-none bg-transparent text-blue-600 mx-1"
                title="add poll">
                <HiOutlineChartBar size={23} />
            </button>
        </div>
    );
}
 
export default SendTweetActionButtons;