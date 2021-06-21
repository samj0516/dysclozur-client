import React, { useContext } from 'react'  
import { useHistory } from 'react-router'
import { Link, useParams } from 'react-router-dom'
import { CommentContext } from './CommentProvider'


export const CommentCard = ({ comment }) => {
    const history = useHistory()
    const { deleteComment } = useContext(CommentContext)
    const currentUser = parseInt(localStorage.getItem('d_user'))
    const { postId } = useParams()
    
    const handleDelete = () => {
        deleteComment(comment.id, postId)
        .then(() => { history.push(`/posts/detail/${postId}`)})
    }
    return(
        <section className="comment">
            <p>{comment.user?.avatar} {comment.user?.user.username}</p>
            <p>{comment.comment}</p>
            

            {currentUser == comment.user.id ?  <button className="editButton" onClick={() => {
                history.push(`/posts/detail/editcomment/${comment.id}`)
            }}>E</button> : <div></div>}
            
            
            {currentUser === comment.user.id ?  <button className="deleteButton" onClick={handleDelete}
                >X</button> : <div></div>}
            
        </section>
    )
}