import { useState } from "react";
function SignUpForm(){
    const[firstName, setFirstName] = useState("")
    const[lastName, setLastName] = useState("")
    const updateFirstName = (e) => {
        setFirstName(e.target.value);
    }
    const updateLastName = (e) => {
        setLastName(e.target.value);
    }


    return (
        <div>
            <label htmlFor="username">Enter a username</label>
            <input type="text" placeholder="username" value={username} onChange={updateUsername} id="username"/>
            <button>Submit</button>
        </div>
    )
}

export default UsernameForm;