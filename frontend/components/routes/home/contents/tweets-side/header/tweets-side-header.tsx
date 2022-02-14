import {FC} from "react";
import {HiOutlineMenuAlt3} from "react-icons/hi";
import SimpleHeader from "../../../../../core-ui/simple-header/simple-header";

interface TweetsSideHeaderProps {}

const TweetsSideHeader: FC<TweetsSideHeaderProps> = () => {
    return (
        <SimpleHeader
            title={"Home"}
            withBack={false}
            containerClassName="h-12 bg-dark bg-opacity-50 backdrop-blur-md"
        />
    );
};

export default TweetsSideHeader;
