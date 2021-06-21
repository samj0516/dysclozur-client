import React, { useContext, useEffect, useState } from "react"
import { CommentContext } from './CommentProvider'
import { useHistory, useParams } from 'react-router-dom'

export const CommentForm = () => {
    const { addComment, getComments, getCommentById, updateComment, comments, getCommentsByPostId, PostComments, setPostComments } = useContext(CommentContext)
    const { postId, commentId } = useParams()
    const history = useHistory();
    const user = localStorage.getItem('user_id')
    const [comment, setComment] = useState({
        id: 0,
        postId: parseInt(postId),
        comment: ""
    });

    useEffect(() => {
        if (commentId) {
            getCommentById(commentId)
                .then(comment => {
                    setComment(comment)
                    // setIsLoading(false)
                })
        }
    }, [])

    const handleControlledInputChange = (event) => {
        const newComment = { ...comment }
        newComment[event.target.id] = event.target.value
        // update state
        setComment(newComment)

    }


    const handleSaveComment = () => {
        console.log(comment)
        const pId = parseInt(postId)
        if (commentId) {
            updateComment({
                id: comment.id,
                postId: comment.postId,
                comment: comment.comment
            })
                // .then(()=> getCommentsByPostId(pId))
                .then(() => history.push(`/posts/detail/${comment.post.id}`))
        } else {
            addComment({
                postId: parseInt(postId),
                comment: comment.comment
            })
                .then(() => getCommentsByPostId(pId))
                .then(() => setComment({
                    postId: parseInt(postId),
                    userId: parseInt(user),
                    comment: ""
                }))
                .then(() => history.push(`/posts/detail/${pId}`))
        }
    }

    return (
        <form className="commentForm">
            <h2 className="commentForm__title">{commentId ? "Edit Comment" : "Add Comment"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="comment">Comment</label>
                    <input type="text" id="comment" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="" value={comment.comment} />
                </div>
            </fieldset>
            <button className="btn btn-primary"
                // disabled={isLoading}
                onClick={event => {
                    event.preventDefault()
                    handleSaveComment()
                }}>
                {commentId ? "Save Edit" : "Add Comment"}
            </button>
        </form>
    )
}