import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { PostCard } from './PostCard'
import { PostContext } from './PostProvider'

export const PostList = props =>{
    const {posts, getPosts} = useContext(PostContext)

    useEffect(() => {
        getPosts()
        
    }, [])
    
   
    const sortedPosts = posts.sort((a, b) => new Date(b.date_posted) - new Date(a.date_posted))
    return(
        <>
        {sortedPosts.map(post => <PostCard key={post.id} post={post}/>)}
        </>
    )
}