import React, { createContext, useState } from 'react'

export const PostContext = createContext()

export const PostProvider = props => {
    const [posts, setPosts] = useState([])
    // const [postDetail, setPostDetail] = useState({})
    const [ searchTerms, setSearchTerms ] = useState("")
    const headers = {
        "Authorization": `Token ${localStorage.getItem("d_token")}`,
        "Content-Type": "application/json"
    }
    
    const getPosts = () => {
        return fetch(`https://dysclozur.herokuapp.com/posts`,{
            headers: headers
        })
            .then(res => res.json())
            .then(setPosts)
    }
    const getPostById = (id) => {
        return fetch(`https://dysclozur.herokuapp.com/posts/${id}`, {
            headers: headers
        })
            .then(res => res.json())
            // .then(setPostDetail)
            
    }

    const addPost = postObj => {
        return fetch("https://dysclozur.herokuapp.com/posts", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(postObj)
        })
        .then(getPosts)
    }

    const updatePost = post => {
        return fetch(`https://dysclozur.herokuapp.com/posts/${post.id}`, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(post)
        })
            .then(getPosts)
    }

    const deletePost = postId => {
        return fetch(`https://dysclozur.herokuapp.com/${postId}`, {
            method: "DELETE",
            headers: headers
        })
            .then(getPosts)
    }

    const postTagDelete = (postTagId) => {
        return fetch(`https://dysclozur.herokuapp.com/postTags/${postTagId}`, {
            method: "DELETE",
            headers: headers
        })
    }
    

    return (
        <PostContext.Provider value={{
            posts, getPosts, getPostById,  addPost, updatePost, deletePost, postTagDelete, searchTerms, setSearchTerms
        }}>
            {props.children}
        </PostContext.Provider>
    )
}