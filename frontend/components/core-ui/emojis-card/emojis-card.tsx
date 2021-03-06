import {Dispatch, FC, SetStateAction} from "react";
import Emoji from "./emoji";

const allEmojis =
    "๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐คฃ ๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ฅฐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐คช ๐คจ ๐ง ๐ค ๐ ๐คฉ ๐ฅณ ๐ ๐ ๐ ๐ ๐ ๐ ๐ โน๏ธ ๐ฃ ๐ ๐ซ ๐ฉ ๐ฅบ ๐ข ๐ญ ๐ค ๐  ๐ก ๐คฌ ๐คฏ ๐ณ ๐ฅต ๐ฅถ ๐ฑ ๐จ ๐ฐ ๐ฅ ๐ ๐ค ๐ค ๐คญ ๐คซ ๐คฅ ๐ถ ๐ ๐ ๐ฌ ๐ ๐ฏ ๐ฆ ๐ง ๐ฎ ๐ฒ ๐ฅฑ ๐ด ๐คค ๐ช ๐ต ๐ค ๐ฅด ๐คข ๐คฎ ๐คง ๐ท ๐ค ๐ค ๐ค ๐ค  ๐ ๐ฟ ๐น ๐บ ๐คก ๐ฉ ๐ป ๐ โ ๏ธ ๐ฝ ๐พ ๐ค ๐ ๐บ ๐ธ ๐น ๐ป ๐ผ ๐ฝ ๐ ๐ฟ ๐พ ๐ ๐ค ๐ โ ๐ ๐ ๐ค ๐ค โ๏ธ ๐ค ๐ค ๐ค ๐ค ๐ ๐ ๐ ๐ ๐ โ๏ธ ๐ ๐ โ ๐ ๐ค ๐ค ๐ ๐ ๐ ๐คฒ ๐ค ๐ โ๏ธ ๐ ๐คณ ๐ช ๐ฆพ ๐ฆต ๐ฆฟ ๐ฆถ ๐ฃ ๐ ๐ฆป ๐ ๐ซ ๐ซ ๐ง  ๐ฆท ๐ฆด ๐ ๐ ๐ ๐ ๐ ๐ฉธ";
const splitedEmojis = allEmojis.split(" ");

interface EmojisCardProps {
    setText?: Dispatch<SetStateAction<string>>;
}

const EmojisCard: FC<EmojisCardProps> = ({setText}) => {
    return (
        <div className="flex justify-center items-center bg-dark rounded-md p-2 border-2 border-secondary">
            <div className="max-h-52 h-52 w-48 overflow-y-scroll overflow-x-hidden custom-scrollbar flex justify-evenly content-start flex-wrap flex-row">
                {splitedEmojis.map((emoji) => (
                    <Emoji
                        key={emoji}
                        onClick={() => setText?.((p) => `${p + emoji}`)}
                        emoji={emoji}
                    />
                ))}
            </div>
        </div>
    );
};

export default EmojisCard;
