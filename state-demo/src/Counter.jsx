import { userState } from "react";
export default function Counter() {
    const [count, setCount] = userState(0);
    const incrementCount = () => {
        setCount(count + 1);
    }

    return (
        <div>
            <h1>New Demo</h1>
            <p>Count : {count} </p>
            <button onClick={incrementCount}>+1</button>
        </div>
    );
}

