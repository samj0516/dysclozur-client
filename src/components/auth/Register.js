import React, { useState, useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import "./Auth.css"





export const Register = (props) => {
    
    const firstName = React.createRef()
    const lastName = React.createRef()
    const email = React.createRef()
    const bio = React.createRef()
    const password = React.createRef()
    const verifyPassword = React.createRef()
    const passwordDialog = React.createRef()
    const username = React.createRef()
    const avatar = React.createRef()
    const [pickedImage, setPickedImage] = useState()
    const history = useHistory()
    
    
    
    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "username": username.current.value,
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "bio": bio.current.value,
                "email": email.current.value,
                "password": password.current.value,
                'avatar': avatar.current
            }

            return fetch("http://127.0.0.1:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newUser)
            })
                .then(res => res.json())
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("d_token", res.token)
                        localStorage.setItem("d_user", res.user_id)
                        props.history.push("/")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    let handleAvatarPick = (e) => {
        console.log(avatar)
        const predator = "https://img.icons8.com/ios/50/000000/predator.png";
        const martian = <img src="https://img.icons8.com/pastel-glyph/64/000000/martian.png"/>
        const zoidberg = <img src="https://img.icons8.com/ios/50/000000/futurama-zoidberg.png"/>
        const bbYoda = <img src="https://img.icons8.com/ios/50/000000/baby-yoda.png"/>
        const slug = <img src="https://img.icons8.com/ios/50/000000/slug.png"/>
        let pick = e.target.id
        // pick = avatar.current.value
        console.log(pick) 
        if (pick === "predator"){
            avatar.current = predator  
            console.log(avatar.current)
        }else if (pick === "martian"){
            avatar.current = martian
        }else if (pick === "zoidberg"){
            avatar.current = zoidberg
        }else if (pick === "bbYoda"){
            avatar.current = bbYoda
        }else if (pick === "slug"){
            avatar.current = slug
        }
        
    }

    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input ref={firstName} type="text" name="firstName" className="form-control" placeholder="First name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input ref={lastName} type="text" name="lastName" className="form-control" placeholder="Last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input ref={email} type="email" name="email" className="form-control" placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="username">Username</label>
                    <textarea ref={username} name="username" className="form-control" placeholder="Pick a username" />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword">Bio</label>
                    <textarea ref={bio} name="bio" className="form-control" placeholder="Who are you?" />
                </fieldset>
                <fieldset>
                    <label htmlFor="avatar">Pick your avatar</label>
                    {/* <input ref={} name="avatar" className='form-control' placeholder=''/> */}
                    <img id="predator" onClick={e => {handleAvatarPick(e)}} src="https://img.icons8.com/ios/50/000000/predator.png"/>
                    <img id="martian" onClick={e => {handleAvatarPick(e)}} src="https://img.icons8.com/pastel-glyph/64/000000/martian.png"/>
                    <img id="zoidberg" onClick={e => {handleAvatarPick(e)}} src="https://img.icons8.com/ios/50/000000/futurama-zoidberg.png"/>
                    <img id="bbYoda" onClick={e => {handleAvatarPick(e)}} src="https://img.icons8.com/ios/50/000000/baby-yoda.png"/>
                    <img id="slug" onClick={e => {handleAvatarPick(e)}} src="https://img.icons8.com/ios/50/000000/slug.png"/>
                    
                </fieldset>
                <fieldset style={{
                    textAlign: "center"
                }}>
                    <button className="btn btn-1 btn-sep icon-send" type="submit">Register</button>
                </fieldset>
            </form>
            <section className="link--register">
                Already registered? <Link to="/login">Login</Link>
            </section>
        </main>
    )
}
