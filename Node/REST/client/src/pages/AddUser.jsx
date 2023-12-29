import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom'; // useHistory 대신 useNavigate 사용
function AddUser() {

    const navigate = useNavigate(); // useNavigate를 사용
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const comment = e.target.comment.value;
        await axios.post('http://localhost:4000/comments/new', { username, comment });
        // 추가가 성공하면 페이지를 리디렉션
        navigate('/');
    }
    return (
        <div>
            <h1>AddComment</h1>
            <Form onSubmit={onSubmitHandler}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>사용자 이름 </Form.Label>
                    <Form.Control name='username' type="text" placeholder="사용자 이름" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>댓글 내용</Form.Label>
                    <Form.Control as="textarea" rows={3} name='comment' />
                </Form.Group>
                <input type='submit' value='추가' />
            </Form>
            <Link to="/">홈으로</Link>
        </div>


    )
}

export default AddUser;