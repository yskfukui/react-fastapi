import React from "react"

export const ErrorMessage=({message})=>{
    return(
            <p className="has-text-weight-bold has-text-danger">{message}</p>
    )
};