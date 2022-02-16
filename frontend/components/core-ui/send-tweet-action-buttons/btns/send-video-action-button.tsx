import {ChangeEvent, Dispatch, FC, SetStateAction, useRef} from "react";
import {HiOutlineFilm} from "react-icons/hi";

interface SendVideoActionButtonProps {
    setVideo?: Dispatch<SetStateAction<File>>;
}

const SendVideoActionButton: FC<SendVideoActionButtonProps> = ({setVideo}) => {
    const videoInputRef = useRef<HTMLInputElement>(null);
    const handleAddVideo = () => {
        videoInputRef?.current?.click();
    };
    const handleChangeVideo = (event: ChangeEvent<HTMLInputElement>) => {
        if (event?.currentTarget?.files && setVideo) {
            const video: File = event.currentTarget.files[0];
            setVideo(video);
            console.log(video);
        }
    };
    return (
        <button
            onClick={handleAddVideo}
            type="button"
            className="border-none bg-transparent text-primary mx-1"
            title="add video">
            <HiOutlineFilm size={23} />
            <input
                className="hidden"
                hidden={true}
                type="file"
                ref={videoInputRef}
                multiple={false}
                accept="video/mp4, video/mkv, video/avi, video/mov, video/*"
                onChange={handleChangeVideo}
            />
        </button>
    );
};

export default SendVideoActionButton;
