import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () =>{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const signUp = () => {
        axios.post( import.meta.env.VITE_BACKEND_ENDPOINT + "/signup", {
            "name": name,
            "email": email,
            "password": password 
        })
            .then((response) => {
                console.log(response);
                navigate("/login")
            })
            .catch((error) => {
                console.log(error.response);
                setErrorMessage(error.response.data);
            })
    };

    return (
        <div>
            <form 
                onSubmit={(e) => {e.preventDefault(); signUp();}} 
                className='form'
            >
                <h1>Create an Account</h1>
                <input 
                    type="text" 
                    placeholder='Enter your name' 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                {errorMessage.name && <p className="error">{errorMessage.name}</p>}
                <input 
                    type="text" 
                    placeholder='Enter your email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                {errorMessage.email && <p className="error">{errorMessage.email}</p>}
                <input 
                    type="password" 
                    name="" id="" 
                    placeholder='Enter your password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                {errorMessage.password && <p className="error">{errorMessage.password}</p>}
                <button type="submit">Sign Up</button>
            </form>
            <div>Already have an account? <Link to={"/login"}>Sign In</Link></div>
        </div>
    )
}

export default SignUp;