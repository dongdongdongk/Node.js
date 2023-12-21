import {useState} from "react";
export default function Counter() {
    const [count, setCount] = useState(0);
    const incrementCount = () => {
        setCount(c => c + 1);
    }

    return (
        <div>
            <h1>New Demo</h1>
            <p>Count : {count} </p>
            <button onClick={incrementCount}>+1</button>
        </div>
    );
}

