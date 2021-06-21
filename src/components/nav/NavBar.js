import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
// import '../../css/mystyles.css'
export const NavBar = (props) => {
    return (
        <>
        <div className="level">
            <h1 className="title is-1">DYSCLOZUR</h1>
        </div>
        <nav className="navbar is-black has-shadow is-fixed-bottom" role="navigation" aria-label="main navigation">
        
            <div className="navbar-item">
                <Link className="navbar-item" to='/'><i className="fas fa-home fa-2x"></i></Link>
            </div>
            <div className="navbar-item">
                <Link className="navbar-item" to='/posts/create'><i className="fas fa-plus-circle fa-2x"></i></Link>
            </div>
            <div className="navbar-item">
                <Link className="navbar-item" to='/profile'><i className="far fa-user fa-2x"></i></Link>
            </div>
            {
                (localStorage.getItem("d_token") !== null) ?
                    <div className="navbar-item">
                        <button className="button navbar-item is-primary fakeLink"
                            onClick={() => {
                                localStorage.removeItem("d_token")
                                props.history.push({ pathname: "/" })
                            }}
                        ><i className="fas fa-sign-out-alt"></i></button>
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
        </>
    )
}
