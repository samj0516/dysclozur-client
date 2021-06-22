import React from "react"
import { Route } from "react-router-dom"
import { PostList } from "./posts/PostList"
import { PostProvider } from "./posts/PostProvider"
import { PostForm } from './posts/PostForm'
import {PostDetail} from './posts/PostDetail'
import {CommentProvider} from './comments/CommentProvider'
import { PostComments } from "./comments/PostComments"
import { CommentForm } from './comments/CommentForm'

export const ApplicationViews = () => {
    return <>
        <PostProvider>
            <CommentProvider>

            <Route exact path="/">
                <PostList />
            </Route>
            <Route exact path="/posts/detail/:postId(\d+)">
                <PostDetail />
                <CommentForm />
                <PostComments />
            </Route>

            <Route exact path="/posts/detail/editcomment/:commentId(\d+)">
                <CommentForm />
            </Route>

            <Route exact path="/posts/create">
                <PostForm />
            </Route>

            <Route exact path="/posts/detail/edit/:postId(\d+)">
                <PostForm />
            </Route>
            </CommentProvider> 
        </PostProvider>
    </>
}