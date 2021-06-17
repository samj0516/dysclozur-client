import React from "react"
import { Route } from "react-router-dom"
import { PostList } from "./posts/PostList"
import { PostProvider } from "./posts/PostProvider"

export const ApplicationViews = () => {
    return <>
        <PostProvider>
            <Route exact path="/">
                <PostList />
            </Route>
        </PostProvider>
    </>
}