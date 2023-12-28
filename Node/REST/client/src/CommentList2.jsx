import Comment from "./Comment";
function CommentList2({comments}) {
    return(
        <div>
            {comments.map((comment) => (
                <Comment username={comment.username} comment={comment.comment} />
            ))};
        </div>
    )
}

export default CommentList2;