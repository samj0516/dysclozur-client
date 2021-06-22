import React from 'react'  
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'


export const PostCard = ({ post }) => {
    // const history = useHistory()
    const currentUser = parseInt(localStorage.getItem('d_user'))
    return (
        <article className="post">
            <Link to={`/posts/detail/${post.id}`}>
            <h4>{post.title}</h4>
            </Link>
            {currentUser === post.user.user.id ? <Link to={`/posts/detail/edit/${post.id}`}>EDIT</Link> : <></>}
            <p>{post.date_posted}</p>
            <p>{post.user.user.username}</p>
            
            {post.url_pic ? <img src={post.url_pic} alt="article pic"/> : <></>}
            {post.upload_pic ? <img src={post.upload_pic} alt="uploaded pic" width="395" height="270"/> : <></>}
            {post.upload_video ? <video id="player" src={post.upload_video} controls>
            </video> : <></>}
            {post.url_video ? <iframe id="player" type="text/html" width="395" height="270"
            src={`http://www.youtube.com/embed/${post.url_video}?enablejsapi=1&origin=http://localhost:3000/`}></iframe> : <></>}
            {post.text ? <p>{post.text}</p> : <> </>}
            {post.link ? <p>{post.link}</p> : <> </>}
        </article>
    )
}