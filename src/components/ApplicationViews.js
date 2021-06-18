import React from "react"
import { Route } from "react-router-dom"
import { PostList } from "./posts/PostList"
import { PostProvider } from "./posts/PostProvider"
import { PostForm } from './posts/PostForm'

export const ApplicationViews = () => {
    return <>
        <PostProvider>

            <Route exact path="/">
                <PostList />
            </Route>

            <Route exact path="/posts/create">
                <PostForm />
            </Route>

            <Route exact path="/posts/detail/edit/:postId(\d+)">
                <PostForm />
            </Route>
            
        </PostProvider>
    </>
}