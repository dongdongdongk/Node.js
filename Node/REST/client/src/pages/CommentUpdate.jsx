import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
const CommentUpdate = () => {
    const params = useParams();
    const navigate = useNavigate(); // useNavigate를 사용
    const [profile, setProfile] = useState(null);
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const comment = e.target.comment.value;
        await axios.patch(`http://localhost:4000/profile/${params.id}`, { username, comment });
        // 추가가 성공하면 페이지를 리디렉션
        navigate('/');
    }
    // 인풋 값이 변경될 때 호출되는 함수
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
    };
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/profile/${params.id}`);
                setProfile(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('프로필 정보를 불러오는 데 실패했습니다.', error);
                setProfile(null);
            }
        };

        fetchProfile();
    }, [params.id]);

    if (!profile) {
        return <p>Loading...</p>;
    }
    return (
        <div>
            <h1>UpdateComment</h1>
            <Form onSubmit={onSubmitHandler}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>사용자 이름 </Form.Label>
                    <Form.Control name='username' type="text" placeholder="사용자 이름" value={profile.username} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>댓글 내용</Form.Label>
                    <Form.Control as="textarea" rows={3} name='comment' value={profile.comment} onChange={handleInputChange} />
                </Form.Group>
                <input type='submit' value='추가' />
            </Form>
            <Link to="/">홈으로</Link>
        </div>
    )
};
export default CommentUpdate;


