import {FC, MouseEvent, useRef} from "react";
import {useTweetsSideContext} from "../../../../../../../contexts/tweets-side-context/tweets-side-context";
import DialogBaseTweetPreview from "./dialog-base-tweet-preview/dialog-base-tweet-preview";
import SendReplyDialogInput from "./send-reply-dialog-input/send-reply-dialog-input";

interface SendReplyDialogProps {}

const SendReplyDialog: FC<SendReplyDialogProps> = () => {
    const {showReplyDialog, setShowReplyDialog} = useTweetsSideContext();
    const containerRef = useRef<HTMLDivElement>(null);
    const handleContainerClick = (event: MouseEvent<HTMLDivElement>) => {
        if (event.target === containerRef.current) {
            setShowReplyDialog?.(false);
        }
    };
    return (
        <div
            ref={containerRef}
            onClick={handleContainerClick}
            className={`fixed top-0 left-0 min-h-screen bg-dark bg-opacity-70 h-screen w-full ${
                showReplyDialog ? "flex" : "hidden"
            } justify-center items-center z-20`}>
            <div className="w-10/12 h-auto md:max-w-md bg-dark flex justify-center items-center flex-wrap flex-row rounded-2xl p-3">
                <SendReplyDialogInput />
                <DialogBaseTweetPreview />
            </div>
        </div>
    );
};

export default SendReplyDialog;
