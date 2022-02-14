import {FC, MouseEvent, useRef, useState} from "react";
import {motion} from "framer-motion";
import {useTweetsSideContext} from "../../../contexts/tweets-side-context/tweets-side-context";
import DialogBaseTweetPreview from "./dialog-base-tweet-preview/dialog-base-tweet-preview";
import SendReplyDialogInput from "./send-reply-dialog-input/send-reply-dialog-input";

interface SendReplyDialogProps {}

const SendReplyDialog: FC<SendReplyDialogProps> = () => {
    const {showReplyDialog, setShowReplyDialog} = useTweetsSideContext();
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentAnimation, setCurrentAnimation] = useState<string>("");
    const handleContainerClick = (event: MouseEvent<HTMLDivElement>) => {
        if (event.target === containerRef.current) {
            setShowReplyDialog?.(false);
        }
    };
    const handleAnimationEnd = () => {
        
    }
    return (
        <div
            ref={containerRef}
            onClick={handleContainerClick}
            className={`fixed top-0 left-0 min-h-screen transition-all bg-light bg-opacity-20 backdrop-blur-md h-screen w-full ${
                showReplyDialog ? "flex" : "hidden"
            } justify-center items-center  transition-all z-20`}>
            <motion.div
                drag="y"
                dragConstraints={{top: 0, bottom: 0}}
                className="w-full h-5/6 md:max-w-md fixed bottom-0 left-0 md:static bg-dark flex justify-center items-center content-start md:content-center flex-wrap flex-row rounded-t-2xl md:rounded-2xl p-3">
                <SendReplyDialogInput />
                <DialogBaseTweetPreview />
            </motion.div>
        </div>
    );
};

export default SendReplyDialog;
