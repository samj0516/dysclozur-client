import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
// import '../../css/mystyles.css'
export const NavBar = (props) => {
    return (
        <nav className="navbar is-primary is-fixed-bottom" role="navigation" aria-label="main navigation">
        
            <div className="navbar-item">
                <Link className="navbar-item" to='/'>Home</Link>
            </div>
            <div className="navbar-item">
                <Link className="navbar-item" to='/posts/create'>+Add Post</Link>
            </div>
            <div className="navbar-item">
                <Link className="navbar-item" to='/profile'>My Profile</Link>
            </div>
            {
                (localStorage.getItem("d_token") !== null) ?
                    <div className="navbar-item">
                        <button className="button navbar-item is-primary fakeLink"
                            onClick={() => {
                                localStorage.removeItem("d_token")
                                props.history.push({ pathname: "/" })
                            }}
                        >Logout</button>
                    </div> :
                    <>
                        <div className="navbar-item">
                            <Link className="navbar-link" to="/login">Login</Link>
                        </div>
                        <div className="navbar-item">
                            <Link className="navbar-link" to="/register">Register</Link>
                        </div>
                    </>
            }        
        </nav>
    )
}
