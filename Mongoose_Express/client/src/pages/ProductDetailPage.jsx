import axios from 'axios';
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';

const ProductDetailPage = () => {
    const params = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:4000/products/${params.id}`)
            .then((response) => response.json())
            .then((data) => setProduct(data))
            .catch((error) => {
                console.error('상품 정보를 불러오는 데 실패했습니다.', error);
                setProduct(null);
            });
    }, [params.id]);
    const deleteProduct = async () => {
        try {
            await axios.delete(`http://localhost:4000/product/${params.id}`);
            navigate("/products");
        } catch (error) {
            console.error('DELETE FAIL', error);
        }
    }

    return (
        <div>
            {product ? (
                <>
                    <h1>{product.name}</h1>
                    <ul>
                        <li>Price : {product.price}</li>
                        <Link to={`/products?category=${product.category}`}>
                            Category : {product.category}
                        </Link>
                    </ul>
                </>
            ) : (
                <p>상품 정보를 불러오는 중입니다...</p>
            )}
            <Link to={"/products"}>홈으로</Link>
            <Link to={`/product/${params.id}/edit`}>상품수정</Link>
            <button type='button' onClick={deleteProduct}>삭제하기</button>
        </div>
    );
};

export default ProductDetailPage;
