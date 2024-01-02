import { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';

const ProductDetailPage = () => {
    const params = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:4000/products/${params.id}`)
          .then((response) => response.json())
          .then((data) => setProduct(data))
          .catch((error) => {
              console.error('상품 정보를 불러오는 데 실패했습니다.', error);
              setProduct(null);
          });
    }, [params.id]);
    
    return (
        <div>
            {product ? (
                <>
                    <h1>{product.name}</h1>
                    <ul>
                        <li>Price : {product.price}</li>
                        <li>Category : {product.category}</li>
                    </ul>
                </>
            ) : (
                <p>상품 정보를 불러오는 중입니다...</p>
            )}
            <Link to={"/products"}>홈으로</Link>
        </div>
    );
};

export default ProductDetailPage;
