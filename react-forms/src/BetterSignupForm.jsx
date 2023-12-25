import { useState } from "react";
function BetterSignUpForm(){
    const [formData,setFormData] = useState({firstName:"",lastName:"",password:""})
    const handleSubmit = () => {
        console.log(formData);
    }

    const handleChange = (evt) => {
        setFormData(currData => {
            return{...currData,[evt.target.name] : evt.target.value}
        })
    }


    return (
        <div>
            <label htmlFor="firstName">First Name</label>
            <input type="text" placeholder="firstName" value={formData.firstName} onChange={handleChange} id="firstName" name="firstName"/>
            <button onClick={handleSubmit}>Submit</button>
            
            <label htmlFor="lastName">Last Name</label>
            <input type="text" placeholder="lastName" value={formData.lastName} onChange={handleChange} id="lastName" name="lastName"/>
            <button onClick={handleSubmit}>Submit</button>
            
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="password" value={formData.password} onChange={handleChange} id="password" name="password"/>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default BetterSignUpForm;