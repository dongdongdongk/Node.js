import axios from 'axios';
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';

const FarmDetailPage = () => {
    const params = useParams();
    const [farm, setFarm] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:4000/farm/${params.id}`)
            .then((response) => response.json())
            .then((data) => setFarm(data))
            .catch((error) => {
                console.error('농장 정보를 불러오는 데 실패했습니다.', error);
                setError(error.message);
            });
    }, [params.id]);

    const deleteFarm = async () => {
        try {
            await axios.delete(`http://localhost:4000/farm/${params.id}`)
            navigate("/farm")
        } catch (error) {
            console.error("Delete Fail", error)

        }
    }
    
    return (
        <div>

            {error && <p>Error : {error} </p>}
            {farm ? (
                <>
                    <h1>{farm.name}</h1>
                    <ul>
                        <li>city : {farm.city}</li>
                        <li>Price : {farm.email}</li>
                    </ul>
                    <h2>Products</h2>
                    {farm.products.map((product) => (
                        <div key={product._id}>
                            <h3>Name: {product.name}</h3>
                            <p>Price: {product.price}</p>
                            <p>Category: {product.category}</p>
                        </div>
                    ))}
                    
                </>
            ) : (
                <p>상품 정보를 불러오는 중입니다...</p>
            )}
            <Link to={"/farm"}>홈으로</Link>
            <button type='button' onClick={deleteFarm}>Delete</button>
        </div>
    );
};

export default FarmDetailPage;
