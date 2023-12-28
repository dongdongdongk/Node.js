import Card from 'react-bootstrap/Card';
function Comment({ username, comment }) {
    return (
        // <div>
        //     <h2>사용자 이름 : {username}</h2>
        //     <p>댓글 : {comment}</p>
        // </div>

        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{username}</Card.Title>
                <Card.Text>
                    {comment}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}




export default Comment;