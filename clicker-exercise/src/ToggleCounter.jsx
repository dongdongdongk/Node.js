import { useState } from "react";
import "./Toggler.css"
export default function TogglerCounter() {
    const [isHappy, setIsHappy] = useState(true);
    const [count, setCount] = useState(0);
    const toggleIsHappy = () => setIsHappy(!isHappy);
    const increment = () => setCount(count + 1);
    return (
        <> 
            <p className="Toggler" onClick={toggleIsHappy}>
                {isHappy ? "😁" : "😢"}
            </p>
        
            <button onClick={increment} >+</button>
            <p>{count}</p>
        </>
    );
}