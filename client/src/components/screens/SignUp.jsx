import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../slices/authSlice";
import { useRegisterMutation } from "../../slices/usersApiSlice";
import isEmail from "../../utils/isEmail";
import Logo from "../Logo";
import BrandLogo from "../BrandLogo";
import Spinner from "../Spinner";

const SignUp = () => {
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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [navigate, userInfo]);

  const signupHandler = async () => {
    setErrorMessage("");
    if (!name) {
      setErrorMessage("Please enter your name");
    } else if (!email) {
      setErrorMessage("Please enter your email");
    } else if (!isEmail(email)) {
      setErrorMessage("Please enter an valid email address");
    } else if (!password) {
      setErrorMessage("Please enter an atleast 8 characters password");
    } else if (password.length < 8) {
      setErrorMessage("Password must me at least 8 characters long");
    } else if (!confirmPassword) {
      setErrorMessage("Please confirm your password");
    } else if (password != confirmPassword) {
      setErrorMessage("The password confirmation doesn't match");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
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
        signupHandler();
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
      <label>
        <div className="text-sm mb-1">Confirm password</div>
        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-black/30 rounded-md focus:outline-brand"
        />
      </label>

      <div>
        {errorMessage && (
          <p className="text-sm text-center text-red-500">{errorMessage}</p>
        )}

        <button
          type="submit"
          className="w-full text-sm p-2 bg-brand hover:bg-dark focus:bg-dark text-white transition-colors rounded-md mt-2"
        >
          {isLoading ? (
            <>
              <span className="mr-1">Signing up</span> <Spinner />
            </>
          ) : (
            "Sign up"
          )}
        </button>
      </div>
    </form>
  );
}

export default SignUp;
