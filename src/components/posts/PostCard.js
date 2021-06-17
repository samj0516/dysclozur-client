import React from 'react'  
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'


export const PostCard = ({ post }) => {
    // const history = useHistory()
     
    return (
        <article className="post">
            <Link to={`/posts/detail/${post.id}`}>
            <h4>{post.title}</h4>
            </Link>
            <p>{post.date_posted}</p>
            <p>{post.user.user.username}</p>
            {post.url_pic ? <img src={post.url_pic} alt="article pic"/> : <></>}
            {post.url_video ? <iframe id="player" type="text/html" width="420" height="315"
            src={`http://www.youtube.com/embed/${post.url_video}?enablejsapi=1&origin=http://localhost:3000/`}></iframe> : <></>}
            {post.text ? <p>{post.text}</p> : <> </>}
            {post.link ? <p>{post.link}</p> : <> </>}
        </article>
    )
}