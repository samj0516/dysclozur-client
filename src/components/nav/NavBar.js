import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"
// import '../../../public/UFO-Free-PNG-Image.png'
// import '../../css/mystyles.css'
export const NavBar = (props) => {
    const history = useHistory()
    return (
        <>
        <div className="level">
            {/* <img src="../../ufo7.png" alt="ufo logo"/> */}
            <h1 className="title is-1">DYSCLOZUR</h1>
        </div>
        <nav className="navbar is-black has-shadow is-fixed-bottom" role="navigation" aria-label="main navigation">
        
            <div className="navbar-item">
                <Link className="navbar-item" to='/'><i className="fas fa-home fa-2x"></i></Link>
            </div>
            <div className="navbar-item">
                <Link className="navbar-item" to='/posts/create'><i className="fas fa-plus-circle fa-2x"></i></Link>
            </div>
            {/* <div className="navbar-item">
                <Link className="navbar-item" to='/profile'><i className="far fa-user fa-2x"></i></Link>
            </div> */}
            {
                (localStorage.getItem("d_token") !== null) ?
                    <div className="navbar-item">
                        <button className="button navbar-item is-dark fakeLink"
                            onClick={() => {
                                localStorage.removeItem("d_token")
                                localStorage.removeItem("d_user")
                                history.push({ pathname: "/login" })
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
