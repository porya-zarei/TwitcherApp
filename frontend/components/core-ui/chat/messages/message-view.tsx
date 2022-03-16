import {FC} from "react";
import {PartialMessage} from "../../../../types/data/message";

interface MessageViewProps {
    message: PartialMessage;
    me?: boolean;
}

const MessageView: FC<MessageViewProps> = ({message, me}) => {
    return (
        <div className="w-full flex my-2 px-2 justify-center items-center">
            <article
                className={`w-full h-auto relative flex ${
                    me ? "justify-end" : "justify-start"
                } content-evenly flex-wrap`}>
                <header className="w-full"></header>
                <main className={`w-full text-white border border-transparent`}>
                    <p
                        className={`max-w-sm w-auto rounded-md p-2 ${
                            me ? "rounded-br-none" : "rounded-bl-none"
                        } ${me ? "bg-primary" : "bg-secondary"}`}>
                        {message?.content || ""}
                    </p>
                </main>
                <footer className="w-full"></footer>
            </article>
        </div>
    );
};

export default MessageView;
