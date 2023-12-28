import CommentList2 from '../CommentList2';
import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [comments, setComments] = useState([]);
    const fetchData = async () => {
        const res = await axios.get('http://localhost:4000/comments');
        setComments(res.data);
    };
    useEffect(() => { fetchData() }, []);

    return (
        <>
            <h1>List</h1>
            <CommentList2 comments={comments} />
            <Link to="/AddUser">댓글추가</Link>
        </>
    );
};

export default Home;