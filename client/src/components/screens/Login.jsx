import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import Logo from "../Logo";
import BrandLogo from "../BrandLogo";
import Spinner from "../Spinner";

const LogIn = () => {
  return (
    <div className="flex min-h-screen flex-col sm:flex-row">
      <div className="sm:w-6/12 p-6 flex flex-col">
        <div className="flex items-center gap-1 text-2xl font-leaguespartan">
          <div className="mb-1">
            <Logo />
          </div>
          <h1 className="">Reveal</h1>
        </div>
        <div className="mt-12 flex-1 self-center max-w-[80%] lg:w-6/12 flex flex-col items-center justify-center font-dmsans">
          <h2 className="self-start text-3xl font-semibold mb-3">
            Welcome back
          </h2>
          <p className="self-start mb-5">Please enter your details.</p>
          <div className="w-full mb-5">
            <LoginForm />
          </div>
          <div className="text-sm text-center">
            Don't have an account yet?{" "}
            <Link to="/" className="text-blue-800">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <BrandLogo />
    </div>
  );
};

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [navigate, userInfo]);

  const signIn = async () => {
    setErrorMessage("");
    if (!email) {
      setErrorMessage("Please enter your email");
    } else if (!password) {
      setErrorMessage("Please enter your password");
    } else {
      try {
        const res = await login({ email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/dashboard");
      } catch (err) {
        setErrorMessage(err?.data?.message);
      }
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        signIn();
      }}
      className="w-full flex flex-col gap-4"
    >
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
      <div>
        {errorMessage && (
          <p className="text-sm text-center text-red-500">{errorMessage}</p>
        )}
        <button
          type="submit"
          className="w-full text-sm p-2 bg-brand text-white rounded-md mt-2"
        >
          {isLoading ? (
            <>
              <span className="mr-1">Signing in</span> <Spinner />
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </div>
    </form>
  );
}

export default LogIn;
