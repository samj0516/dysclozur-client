import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { PostContext } from './PostProvider'
import { Link } from 'react-router-dom'

export const PostDetail = () => {
    const { getPostById } = useContext(PostContext)
    const [postDetail, setPostDetail] = useState({})
    const {postId} = useParams()
    const currentUser = parseInt(localStorage.getItem('d_user'))
    // const history = useHistory()

    useEffect(() => {
        getPostById(postId)
        .then((res) => {
            setPostDetail(res)
        })
        
    }, [])

    return (
        <>
        <article className="post_detail">
           {postDetail.link ? <Link to={postDetail.link}>
            <h1 className="title">{postDetail.title}</h1>
            </Link> : <h1 className="title">{postDetail.title}</h1> } 
            <h2 className="user">u/{postDetail.user?.user.username}</h2>
            <h2 className="date_posted">{postDetail.date_posted}</h2>
            {postDetail.url_pic ? <img src={postDetail.url_pic} alt="article pic"/> : <></>}
            {postDetail.url_video ? <iframe id="player" type="text/html" width="420" height="315"
            src={`http://www.youtube.com/embed/${postDetail.url_video}?enablejsapi=1&origin=http://localhost:3000/`}></iframe> : <></>}
            {postDetail.upload_pic ? <img src={postDetail.upload_pic} alt="uploaded pic" width="395" height="270"/> : <></>}
            {postDetail.upload_video ? <video id="player" src={postDetail.upload_video} controls>
            </video> : <></>}
            {postDetail.text ? <p>{postDetail.text}</p> : <> </>}
            {postDetail.link ? <p>{postDetail.link}</p> : <> </>}
        </article>
        </>
    )
}