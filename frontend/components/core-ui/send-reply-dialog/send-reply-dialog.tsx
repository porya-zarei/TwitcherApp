import {AnimationEventHandler, FC, MouseEvent, useRef, useState} from "react";
import {motion, useMotionValue} from "framer-motion";
import {useTweetsSideContext} from "../../../contexts/tweets-side-context/tweets-side-context";
import DialogBaseTweetPreview from "./dialog-base-tweet-preview/dialog-base-tweet-preview";
import SendReplyDialogInput from "./send-reply-dialog-input/send-reply-dialog-input";

interface SendReplyDialogProps {}

const SendReplyDialog: FC<SendReplyDialogProps> = () => {
    const {showReplyDialog, setShowReplyDialog} = useTweetsSideContext();
    const yPosition = useMotionValue(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentAnimation, setCurrentAnimation] =
        useState<string>("open-dialog");
    const handleContainerClick = (event: MouseEvent<HTMLDivElement>) => {
        if (event.target === containerRef.current) {
            setCurrentAnimation("dialog-close");
        }
    };
    const handleAnimationEnd: AnimationEventHandler<HTMLDivElement> = (
        event,
    ) => {
        console.log("animation end", currentAnimation);
        if (currentAnimation === "dialog-close") {
            setShowReplyDialog?.(false);
            setCurrentAnimation("dialog-open");
        }
    };
    const handleDragEnd = () => {
        if (yPosition.get() > 100) {
            setShowReplyDialog?.(false);
            setCurrentAnimation("dialog-open");
        }
    };
    return (
        <div
            ref={containerRef}
            id="send-reply-dialog-container"
            onClick={handleContainerClick}
            className={`fixed top-0 left-0 min-h-screen transition-all bg-light bg-opacity-20 backdrop-blur-md h-screen w-full ${
                showReplyDialog ? "flex" : "hidden"
            } justify-center items-center  transition-all z-20`}>
            <motion.div
                drag="y"
                draggable={true}
                style={{y: yPosition}}
                onAnimationEnd={handleAnimationEnd}
                onDragEnd={handleDragEnd}
                dragConstraints={{top: 0, bottom: 0}}
                className={`w-full h-5/6 md:h-auto md:max-w-md transition-all fixed bottom-0 left-0 md:static bg-dark flex justify-center items-center content-start md:content-center flex-wrap flex-row rounded-t-2xl md:rounded-2xl p-3 ${currentAnimation}`}>
                <SendReplyDialogInput />
                <DialogBaseTweetPreview />
            </motion.div>
        </div>
    );
};

export default SendReplyDialog;
