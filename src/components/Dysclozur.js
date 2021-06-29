import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import '../css/mystyles.css'
export const Dysclozur = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("d_token")) {
                return <>
                    <NavBar />
                    <ApplicationViews />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={() => {
            if (localStorage.getItem("d_token")) {
                return <Redirect to="/" />
            } else {
                return <Login />
            }
        }} />

        <Route path="/register" render={(props) => {
            if (localStorage.getItem("d_token")) {
                return <Redirect to="/" />
            } else {
                return <Register {...props} />
            }
        }} />
    </>
)

{/* <Route render={NavBar} />
                    <Route render={props => <ApplicationViews {...props} />} /> */}