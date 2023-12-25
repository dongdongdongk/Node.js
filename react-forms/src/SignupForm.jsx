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
    const handleSubmit = () => {
        console.log(firstName,lastName);
    }


    return (
        <div>
            <label htmlFor="firstName">First Name</label>
            <input type="text" placeholder="firstName" value={firstName} onChange={updateFirstName} id="firstName"/>
            <button onClick={handleSubmit}>Submit</button>
            
            <label htmlFor="lastName">Last Name</label>
            <input type="text" placeholder="lastName" value={lastName} onChange={updateLastName} id="lastName"/>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default SignUpForm;