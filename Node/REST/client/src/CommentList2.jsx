import Comment from "./Comment";
import { Link } from 'react-router-dom';
function CommentList2({ comments }) {
    return (
        <div>
            {comments.map((comment) => (
                <Link to={`/profile/${comment.username}`}>
                    <Comment username={comment.username} comment={comment.comment} />
                </Link>
            ))}
        </div>
    )
}

export default CommentList2;