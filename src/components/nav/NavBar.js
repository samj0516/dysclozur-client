import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="nav-link" to='/'>Home</Link>
            </li>
            <li className="navbar__item">
                <Link className="nav-link" to='/events'>+Add Post</Link>
            </li>
            <li className="navbar__item">
                <Link className="nav-link" to='/profile'>My Profile</Link>
            </li>
            {
                (localStorage.getItem("d_token") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("d_token")
                                props.history.push({ pathname: "/" })
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}