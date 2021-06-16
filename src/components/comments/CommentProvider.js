import React, { useState, createContext } from "react"
import { useParams } from 'react-router-dom'
export const CommentContext = createContext()

export const CommentProvider = (props) => {
    const { postId, commentId } = useParams()
    const [comments, setComments] = useState([])
    const [postComments, setPostComments] = useState([])
    const headers = {
        "Authorization": `Token ${localStorage.getItem("d_token")}`,
        "Content-Type": "application/json"
    }

    const getComments = () => {
        return fetch("http://localhost:8000/comments", {
            headers: headers
        })
        .then(res => res.json())
        .then(setComments)
    }

    const addComment = commentObj => {
        return fetch("http://localhost:8000/comments", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(commentObj)
        })
        .then(getComments)
    }

    const getCommentsByPostId = (postId) =>{
        return fetch(`http://localhost:8000/comments?postId=${postId}`, {
            headers: headers
        })
        .then(res => res.json())
        .then(setPostComments)
    }
    
    const getCommentById = (id) => {
        return fetch(`http://localhost:8000/comments/${id}`, {
            headers: headers
        })
            .then(res => res.json())
    }

    const deleteComment = (commentId, postId) => {
        return fetch(`http://localhost:8000/comments/${commentId}`, {
            method: "DELETE",
            headers: headers
        })
          .then(() => getCommentsByPostId(postId))  
    }

    const updateComment = comment => {
        return fetch(`http://localhost:8000/comments/${comment.id}`, {
          method: "PUT",
          headers: headers,
          body: JSON.stringify(comment)
        })
          .then(getComments)
      }

    return (
        <CommentContext.Provider value={{
            comments, getComments, addComment, getCommentById, updateComment, deleteComment, getCommentsByPostId, postComments, setPostComments
        }}>
            {props.children}
        </CommentContext.Provider>
    )
}