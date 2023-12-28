import axios from 'axios';
import Form from 'react-bootstrap/Form';
function AddUser() {
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const comment = e.target.comment.value;
        await axios.post('http://localhost:4000/comments/new', { username, comment });
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
        </div>


    )
}

export default AddUser;