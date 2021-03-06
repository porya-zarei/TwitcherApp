import {FC} from "react";

interface TweetContentProps {
    content?: string;
}

const TweetContent: FC<TweetContentProps> = ({content}) => {
    return (
        <div className="w-full flex justify-start items-center flex-wrap flex-row mb-2">
            <p>{content ?? ""}</p>
        </div>
    );
};

export default TweetContent;
