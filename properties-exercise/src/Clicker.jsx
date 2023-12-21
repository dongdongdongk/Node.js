function handClick() {
    console.log("클릭")
}

export default function Clicker() {
    return (
        <div>
            <p>Click Button</p>
            <button onClick={handClick}>Click</button>
        </div>
    )
}