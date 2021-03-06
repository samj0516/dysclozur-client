import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'

import { PostContext } from './PostProvider'

export const PostForm = () => {
    const { addPost, getPostById, updatePost, deletePost, postDetail } = useContext(PostContext)
    const { postId } = useParams();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [image, setImage] = useState(null)
    const [video, setVideo] = useState(null)
    const [validMsg, setValidMsg] = useState("");
    const [post, setPost] = useState({
        date_posted: "",
        title: "",
        text: "",
        link: "",
        url_video: "",
        url_pic: "",
        upload_pic: "",
        upload_video: ""
    })

    useEffect(() => {
        if (postId) {
            getPostById(postId)
            .then(post => {
                setPost(post)
                setIsLoading(false)})
            
        }else {
            setIsLoading(false)
        }
    },[postId])

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    } 

     //handle controlled input change and convert the image to a format that can be sent to server
     const createBase64String = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
    
            // Update a component state variable to the value of base64ImageString
            setImage(base64ImageString)
        });
    }

    const createBase64VideoString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
    
            // Update a component state variable to the value of base64ImageString
            setVideo(base64ImageString)
        });
    }

    const handleControlledInputChange = (event) => {
        const newPost = { ...post }
        newPost[event.target.id] = event.target.value
        setPost(newPost)
    }

    const handleDeletePost = (event) => {
        if(window.confirm("Are you sure?")===true){
    // debugger
            deletePost(event.target.id)
            .then(() => {
            history.push("/")
            })
        }
    }

    const handleSavePost = () => {
        let validForm=false
        let validMsgString=""

        if (post.title.length === 0) {
            validMsgString = "Title required."
        }
        else
            validForm=true
        
        
    if (validForm===false) {
        window.alert(validMsgString)
    } else {
        //disable the button - no extra clicks
        setIsLoading(true);

        //if params has postId then UPDATE else ADD
        if (postId){
        // PUT - update
        updatePost({
            id: post.id,
            user_id: post.user.id,
            date_posted: post.date_posted,
            title: post.title,
            text: post.text,
            link: post.link,
            url_pic: post.url_pic,
            url_video: post.url_video,
            upload_pic: image,
            upload_video: video
        })
        .then(() => history.push(`/posts/detail/${post.id}`))
        }else {
        //POST - add
        
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        let newDate = dateObj.toISOString()
        
        // debugger
        addPost({
            date_posted: newDate,
            title: post.title,
            text: post.text,
            link: post.link,
            url_pic: post.url_pic,
            url_video: post.url_video,
            upload_pic: image,
            upload_video: video
        })
        .then(setPost({  //reset state obj as blank to zero out add form
            title: "",
            text: "",
            link: "",
            url_video: "",
            url_pic: "",
            upload_pic: "",
            upload_video: ""
            
        }))
        // .then(setIsLoading(false))
        .then(() => history.push("/"))
        }
    }
}
    

    return(
        <>
        <div className="section has-text-centered"> 
        {/* {console.log(post)} */}
        <form className="post">
        <h2 className="postForm__title">{postId ? "Edit Post" : "Add Post"}</h2>

            {validMsg.length > 0 ? "" : validMsg}
         <fieldset>
        <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" required autoFocus className="form-control"
            placeholder="Title"
            onChange={handleControlledInputChange}
            value={post.title}/>
        </div>
        </fieldset>

        <fieldset>
        <div className="form-group">
            <label htmlFor="text">Text: </label>
            <input type="text" id="text" required className="form-control"
            placeholder="Text"
            onChange={handleControlledInputChange}
            value={post.text}/>
        </div>
        </fieldset>
        
        <fieldset>
        <div className="form-group">
            <label htmlFor="link">Link: </label>
            <input type="text" id="link" required className="form-control"
            placeholder="Enter URL"
            onChange={handleControlledInputChange}
            value={post.link}/>
        </div>
        </fieldset>

        <fieldset>
        <div className="form-group">
            <label htmlFor="url_pic">Image: </label>
            <input type="text" id="url_pic" required className="form-control"
            placeholder="Enter Image URL"
            onChange={handleControlledInputChange}
            value={post.url_pic}/>
        </div>
        </fieldset>
        <fieldset>
        <div className="form-group">
            <label htmlFor="url_video">Youtube: </label>
            <input type="text" id="url_video" required className="form-control"
            placeholder="Enter Youtube Video ID"
            onChange={handleControlledInputChange}
            value={post.url_video}/>
        </div>
        </fieldset>
        <fieldset>
        <div className="form-group">
            <label htmlFor="upload_pic">Upload Image: </label>
            <input type="file" id="upload_pic" onChange={createBase64String}/>
            <input type="hidden" name="upload_pic" value={image} />
        </div>
        </fieldset>

        {/* <input type="file" id="img" onChange={createProfileImageString} />
                        <input type="hidden" name="img" value={image} /> */}

        <fieldset>
        <div className="form-group">
            <label htmlFor="upload_video">Upload Video: </label>
            <input type="file" id="upload_video"  onChange={createBase64VideoString}/>
            <input type="hidden" name="upload_video" value={image} />
        </div>
        </fieldset>

        <button className=""
        type="submit"
        disabled={isLoading}
        onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleSavePost()
        }}>

        {/* show ADD or SAVE if adding or editing  */}
        {postId ? " Save Post " : " Add Post "}

        </button>
        <div className="divider"/>
        {/* only show delete button if editing */}
        {postId ?
        <button type="button" id={postId} className="" onClick={handleDeletePost}>
        Delete Post
        </button>
        :
        ""
        }

        </form>

        </div>
        </>
    )

}