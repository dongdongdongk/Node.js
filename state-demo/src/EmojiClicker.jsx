import { useState } from "react";

function EmojiClicker() {
    const [emojis, setEmojis] = useState(["😁"]);
    const addEmoji = () => {
    setEmojis((oldEmojis) => [...oldEmojis,"😘"])
    }
    return(
        <div>
            {emojis.map((e)=>(<span style={{fontSize:"4rem"}}>{e}</span>))}
            <button onClick={addEmoji}>Add Emoji</button>
        </div>
    )
}

export default EmojiClicker;