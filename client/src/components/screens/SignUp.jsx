import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleIcon from "../icons/GoogleIcon";
import Logo from "../Logo";
import BrandLogo from "../BrandLogo";

const SignUp = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-6/12 p-6 flex flex-col">
        <div className="flex items-center gap-1 text-2xl font-leaguespartan">
          <div className="mb-1">
            <Logo />
          </div>
          <h1 className="">Reveal</h1>
        </div>
        <div className="flex-1 self-center w-6/12 flex flex-col items-center justify-center font-dmsans">
          <h2 className="self-start text-3xl font-semibold mb-3">
            Create your account
          </h2>
          <p className="self-start mb-5">We're excited to have you join us!</p>
          <div className="w-full mb-5">
            <SignupForm />
          </div>
          <div className="text-sm text-center">
            Already have an account?{" "}
            <Link to={"/signin"} className="text-blue-800">
              Sign In
            </Link>
          </div>
        </div>
      </div>
      <BrandLogo />
    </div>
  );
};

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const signUp = () => {
    axios
      .post(import.meta.env.VITE_BACKEND_ENDPOINT + "/signup", {
        name: name,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response);
        setErrorMessage(error.response.data);
      });
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        //   signUp();
      }}
      className="w-full flex flex-col gap-4"
    >
      <label>
        <div className="text-sm mb-1">Name</div>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-black/30 rounded-md focus:outline-brand"
        />
      </label>
      <label>
        <div className="text-sm mb-1">Email</div>
        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-black/30 rounded-md focus:outline-brand"
        />
      </label>
      <label>
        <div className="text-sm mb-1">Password</div>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-black/30 rounded-md focus:outline-brand"
        />
      </label>

      <button
        type="submit"
        className="text-sm p-2 bg-brand text-white rounded-md mt-2"
      >
        Sign Up
      </button>
      <Link
        to=""
        className="text-center text-xs p-[0.35rem] bg-light border border-black/20 rounded-md"
      >
        <GoogleIcon iconClass="inline w-4 h-4 mr-1" /> Sign in with Google
      </Link>
    </form>
  );
}

export default SignUp;

{
  /* {errorMessage.password && (
              <p className="error">{errorMessage.password}</p>
            )} */
}
