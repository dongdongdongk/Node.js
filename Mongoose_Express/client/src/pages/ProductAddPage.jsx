import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const ProductAddPage = () => {
    const navigate = useNavigate();

    // 상태 초기화
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: 'fruit' // 기본값 설정
    });

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
            await axios.post('http://localhost:4000/product/new', formData);
            navigate('/products');
        } catch (error) {
            console.error('상품 추가 중 오류 발생:', error);
        }
    };

    return (
        <>
            <h1>ProductAddPage</h1>
            <form onSubmit={onSubmitHandler}>
                <label htmlFor="name">ProductName</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    name="price"
                    id="price"
                    value={formData.price}
                    onChange={handleChange}
                />
                <label htmlFor="category">Category</label>
                <select
                    name="category"
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="fruit">fruit</option>
                    <option value="vegetable">vegetable</option>
                    <option value="dairy">dairy</option>
                </select>
                <input type="submit" value="상품추가" />
            </form>
        </>
    );

};

export default ProductAddPage;