import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { PostCard } from './PostCard'
import { PostContext } from './PostProvider'

export const PostList = props =>{
    const {posts, getPosts} = useContext(PostContext)

    useEffect(() => {
        getPosts()
    }, [])

    return(
        <>
        {posts.map(post => <PostCard key={post.id} post={post}/>)}
        </>
    )
}