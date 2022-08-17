import React from "react";
import { useContext,useState } from "react";
import { UserContext } from "./UserContext";
import "bulma/css/bulma.min.css";
import { ErrorMessage } from "./ErrorMessage";

export const Register=()=>{
    const [email,setEmail]=useState("");
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [confirmationPassword,setConfirmationPassword]=useState("");
    const [errorMessage,setErrorMessage]=useState("");
    const [,setToken]=useContext(UserContext);

    const submitRegistration = async()=>{
        const requestOptions={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email:email,password:password,username:username}),
        };
        const url = "http://127.0.0.1:8000/users";
        const response=await fetch(url,requestOptions);
        const data=await response.json();
        console.log(data.detail)
        if(!response.ok){
            setErrorMessage(data.detail);
        }else{
            setToken(data.access_token)
        }
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(password === confirmationPassword){
            submitRegistration();
        }else{
            setErrorMessage("Ensure that the passwords match")
        }
    }
    return (
        <div className="column">
            <form className="box" onSubmit={handleSubmit}>
                <h1 className="title has-text-centered">Register</h1>
                <div className="field">
                    <label className="label">Email Address</label>
                    <div className="control">
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            className="input"
                            required
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                        <input
                            type="username"
                            placeholder="Enter Username"
                            value={username}
                            onChange={(e)=>setUsername(e.target.value)}
                            className="input"
                            required
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            className="input"
                            required
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Confirm Password</label>
                    <div className="control">
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={confirmationPassword}
                            onChange={(e)=>setConfirmationPassword(e.target.value)}
                            className="input"
                            required
                        />
                    </div>
                </div>
                <ErrorMessage message={errorMessage}/>
                <br />
                <button className="button is-primary" type="submit">
                    Register
                </button>
            </form>

        </div>
    );
};