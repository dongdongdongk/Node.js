import { useEffect, useState } from "react";
import { Link, useSearchParams } from 'react-router-dom';

const FarmPage = () => {
    const [farm, setFarm] = useState([]);

    useEffect(() => {
        const apiUrl = 'http://localhost:4000/farm';

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => setFarm(data));
    }, [farm]);

    return (
        <>
            <h1>FarmPage</h1>
            <ul>
                {farm.map((farm) => (
                    <li key={farm._id}>
                         <Link to={`/farm/${farm._id}`}>{farm.name}</Link> 
                    </li>
                ))}
            </ul>
            {/* <Link to={"/product/new"}>상품등록</Link>
            {category && <Link to={"/products"}>AllPage</Link>} */}
        </>
    );
}

export default FarmPage;