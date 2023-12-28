function Comment({username, comment}) {
    return(
        <div>
            <h2>사용자 이름 : {username}</h2>
            <p>댓글 : {comment}</p>
        </div>
    )
}

export default Comment;