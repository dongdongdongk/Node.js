import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const FarmAddPage = () => {
    const navigate = useNavigate();

    // 상태 초기화
    const [formData, setFormData] = useState({
        name: '',
        city: '',
        email: '' // 기본값 설정
    });
    const [error, setError] = useState(null);

    // 입력값 변경 시 상태 업데이트
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };



    // 폼 제출 핸들러
    const onSubmitHandler = async (e) => {
        e.preventDefault();

        // 폼 데이터 전송
        try {
            await axios.post('http://localhost:4000/farm/new', formData);
            navigate('/products');
        } catch (error) {
            console.error('농장 추가 중 오류 발생:', error);
            setError(error.message)
        }
    };

    return (
        <>
            {error ? <p>Error : {error} </p> : 
            
            
            
            <div>
                <h1>FarmAddPage</h1>
                <form onSubmit={onSubmitHandler}>
                    <div>
                        <label htmlFor="name">FarmName</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="price">City</label>
                        <input
                            type="text"
                            name="city"
                            id="city"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <input type="submit" value="상품추가" />
                </form>
            </div>
            
            }
        </>
    );

};

export default FarmAddPage;