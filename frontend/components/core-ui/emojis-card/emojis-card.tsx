import {Dispatch, FC, SetStateAction} from "react";
import Emoji from "./emoji";

const allEmojis =
    "😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 🙂 🙃 😉 😌 😍 🥰 😘 😗 😙 😚 😋 😛 😝 😜 🤪 🤨 🧐 🤓 😎 🤩 🥳 😏 😒 😞 😔 😟 😕 🙁 ☹️ 😣 😖 😫 😩 🥺 😢 😭 😤 😠 😡 🤬 🤯 😳 🥵 🥶 😱 😨 😰 😥 😓 🤗 🤔 🤭 🤫 🤥 😶 😐 😑 😬 🙄 😯 😦 😧 😮 😲 🥱 😴 🤤 😪 😵 🤐 🥴 🤢 🤮 🤧 😷 🤒 🤕 🤑 🤠 😈 👿 👹 👺 🤡 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👋 🤚 🖐 ✋ 🖖 👌 🤌 🤏 ✌️ 🤞 🤟 🤘 🤙 👈 👉 👆 🖕 👇 ☝️ 👍 👎 ✊ 👊 🤛 🤜 👏 🙌 👐 🤲 🤝 🙏 ✍️ 💅 🤳 💪 🦾 🦵 🦿 🦶 👣 👂 🦻 👃 🫀 🫁 🧠 🦷 🦴 👀 👁 👅 👄 💋 🩸";
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
