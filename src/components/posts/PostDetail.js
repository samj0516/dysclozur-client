import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { PostContext } from './PostProvider'
import { Link } from 'react-router-dom'
import { VoteContext } from '../votes/VoteProvider'


export const PostDetail = () => {
    const { getPostById } = useContext(PostContext)
    const { addPostVote } = useContext(VoteContext)
    const [postDetail, setPostDetail] = useState({})
    const {postId} = useParams()
    const currentUser = parseInt(localStorage.getItem('d_user'))
    // const history = useHistory()
    // let postVoteCount = 0
    useEffect(() => {
        getPostById(postId)
        .then((res) => {
            setPostDetail(res)
            // postVoteCount = res.vote_set.length
             
        })
        
        // postVoteCount = postDetail.vote_set.length
        
    }, [])

    const handleUpvote = () =>{
        addPostVote({
            post: postDetail.id,
            upvote: true, 
        }, postDetail.id

        )
        .then(() => getPostById(postId))
        .then((res) => {
            setPostDetail(res)
        })
    }

    const handleDownvote = () =>{
        addPostVote({
            post: postDetail.id,
            upvote: false, 
        }, postDetail.id

        )
        .then(() => getPostById(postId))
        .then((res) => {
            setPostDetail(res)
        })
    }

    return (
        <>
        <div className='container is-fluid'>
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
            <div className='postVote'>
                <div className='upvote' onClick={handleUpvote}>
                    <i className="fas fa-chevron-up"></i>
                </div>
                <p>{postDetail.vote_set?.length}</p>
                <div className='upvote' onClick={handleDownvote}>
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
            
        </article>
        </div>
        </>
    )
}