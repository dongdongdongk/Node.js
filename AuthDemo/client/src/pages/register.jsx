import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    //상태 초기화 
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    // 입력값 변경 핸들러 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevDate) => ({
            ...prevDate, [name]: value
        }));
    }
    
    // 폼 제출 핸들러 
    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        // 폼 데이터 전송
        try {
            await axios.post('http://localhost:4000/register', formData);
            navigate('/')
        } catch (error) {
            console.error("SAVE FAIL", error);
        }
    }


    return (
        <>
            <h1>SignUp</h1>
            <form onSubmit={onSubmitHandler}>
                <div>
                    <label htmlFor="username">Enter Username:</label>
                    <input 
                        type="text" 
                        name="username" 
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Enter PassWord:</label>
                    <input 
                        type="text" 
                        name="password" 
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Login</button>

            </form>
        </>
    )

}


export default Register;