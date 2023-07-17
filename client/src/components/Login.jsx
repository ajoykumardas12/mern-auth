import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LogIn = ({setLoggedIn}) =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const signIn = (() => {
        axios.post( import.meta.env.VITE_BACKEND_ENDPOINT + "/login", {
            "email": email,
            "password": password 
        })
            .then((response) => {
                console.log(response);

                if(response.data.user){
                    setLoggedIn();
                    localStorage.setItem("jwtoken", response.data.user);
                    navigate('/dashboard');
                }
            })
            .catch((error) => {
                console.log( "error", error.response);
                setErrorMessage(error.response.data.msg);
            })
    })

    return (
        <div>
            <form 
                onSubmit={(e) => {e.preventDefault(); signIn();}} 
                className='form'
            >
                <h1>Sign In</h1>
                <input 
                    type="text" 
                    placeholder='Enter your email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                    type="password" 
                    name="" id="" 
                    placeholder='Enter your password' 
                    value={password} onChange={(e) => setPassword(e.target.value)} 
                />
                {errorMessage && <p className="error">{errorMessage}</p>}
                <button type="submit" >Sign In</button>
            </form>
            <div>Don't have an account yet? <Link to={"/"}>Sign Up</Link></div>
        </div>
    )
}

export default LogIn;