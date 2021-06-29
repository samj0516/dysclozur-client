import React, { useContext }from 'react'  
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { VoteContext } from '../votes/VoteProvider'
import { PostContext } from './PostProvider'
export const PostCard = ({ post }) => {
    const history = useHistory()
    const { addPostVote } = useContext(VoteContext)
    const { getPosts, deletePost } = useContext(PostContext)
    const currentUser = parseInt(localStorage.getItem('d_user'))
    const postVoteCount = post.vote_set.length


    const handleUpvote = () =>{
        addPostVote({
            post: post.id,
            upvote: true, 
        }, post.id

        )
        .then(getPosts)
    }

    const handleDownvote = () =>{
        addPostVote({
            post: post.id,
            upvote: false, 
        }, post.id

        )
        .then(getPosts)
    }

    

    return (
        <div className="section has-text-centered">
        <article className="post">
            <div className='postHeading'>
            <Link to={`/posts/detail/${post.id}`}>
            <h4 className='subtitle is-3'>{post.title}</h4>
            </Link>
            </div>
            <div className='postSubheading'>
            <p>{post.user.user.username}</p>
            <p>{post.date_posted}</p>
            
            {currentUser === post.user.user.id ? <Link to={`/posts/detail/edit/${post.id}`}><i className="far fa-edit"></i></Link> : <></>}
            
            </div>
            
            {post.url_pic ? <img src={post.url_pic} alt="article pic"/> : <></>}
            {post.upload_pic ? <img src={post.upload_pic} alt="uploaded pic" /> : <></>}
            {post.upload_video ? <video id="player" src={post.upload_video} controls>
            </video> : <></>}
            
            {post.url_video ? <div className='videoWrapper'><iframe id="player" type="text/html" 
            src={`https://www.youtube.com/embed/${post.url_video}?enablejsapi=1&origin=https://60db875d908bd60aab3cf0f0--kind-raman-df5a12.netlify.app/`}></iframe></div> : <></>}
            
            {/* {post.text ? <p>{post.text}</p> : <> </>} */}
            {/* {post.link ? <p>{post.link}</p> : <> </>} */}
            <div className='postVote'>
                <div className='upvote' onClick={handleUpvote}>
                    <i className="fas fa-chevron-up"></i>
                </div>
                <p>{postVoteCount}</p>
                <div className='upvote' onClick={handleDownvote}>
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
        </article>
        </div>
    )
}