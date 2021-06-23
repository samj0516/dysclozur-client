import React, { createContext, useState } from 'react'

export const VoteContext = createContext()

export const VoteProvider = props => {
    const [votes, setVotes] = useState([])
    const [postVotes, setPostVotes] = useState([])

    const headers = {
        "Authorization": `Token ${localStorage.getItem("d_token")}`,
        "Content-Type": "application/json"
    }

    const getVotes = () => {
        return fetch('http://localhost:8000/votes', {
            headers: headers
        })
        .then(res => res.json())
        .then(setVotes)
    }

    // const getVotesById = (id) => {
    //     return fetch(`http://localhost:8000/votes/${id}`, {
    //         headers: headers
    //     })
    //         .then(res => res.json())
            
            
    // }

    const addPostVote = (reactObj, post) => {
        return fetch(`http://localhost:8000/votes`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(reactObj)
        })
        .then(getVotes)
                
    }

    return(
        <VoteContext.Provider value={{
            addPostVote, postVotes }}>
                {props.children}
            </VoteContext.Provider>
        
    )
}