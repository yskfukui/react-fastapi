import React from "react"
// import moment from "moment"

import { ErrorMessage } from "./ErrorMessage"
import { UserContext } from "./UserContext"
import { useContext ,useState} from "react"
import { useEffect } from "react"

export const Table=()=>{
    const [token,]=useContext(UserContext)
    const[item,setItem]=useState(null)
    const[errorMessage,setErrorMessage]=useState("")
    const [loaded,setLoaded]=useState(false)
    const [activeModa,setActiveModal]=useState(false)

    const URL = "http://127.0.0.1:8000/items/";

    const[id,setId]=useState(null)

    const getItem=async()=>{
        const requestOptions={
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer "+token,
            }
        }
        const response=await fetch(URL,requestOptions)
        
        if(!response.ok){
            setErrorMessage("Error: Couldn't load the items")
        }else{
            const data=await response.json()
            setItem(data)
            setLoaded(true)
        }
    }

    // useEffect(()=>{
    //     getItem();
    // },[])

    return (
        <div>
            <button className="button is fullwidth mb-5 is-primary">
                Create Item
            </button>
            <ErrorMessage message={errorMessage}/>
            {loaded && item ?(
                <table className="table is-fullwidh">
                    <thead>
                        <tr>
                            <th>title</th>
                            <th>description</th>
                        </tr>
                    </thead>
                </table>
            ):(
                <p>loading</p>
            )
            }
        </div>
    )

}
