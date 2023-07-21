import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import Spinner from "./Spinner";

const Profile = () => {
  return (
    <div>
      Profile
      <div className="w-4/12">
        {" "}
        <EditProfileForm />
      </div>
    </div>
  );
};

function EditProfileForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.setName, userInfo.setEmail]);

  const signupHandler = async () => {
    setErrorMessage("");
    if (password) {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email: userInfo.email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/dashboard");
      } catch (err) {
        setErrorMessage(err?.data?.message);
      }
    } else {
      setErrorMessage("Please enter new password");
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
          placeholder="Update your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-black/30 rounded-md focus:outline-brand"
        />
      </label>
      <label>
        <div className="text-sm mb-1">Email</div>
        <input
          type="text"
          placeholder="Your email"
          value={email}
          disabled={true}
          // onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-black/30 rounded-md focus:outline-brand disabled:bg-light"
        />
      </label>
      <label>
        <div className="text-sm mb-1">Password</div>
        <input
          type="password"
          placeholder="Enter new password"
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
              <span className="mr-1">Updating profile</span> <Spinner />
            </>
          ) : (
            "Update Profile"
          )}
        </button>
      </div>
    </form>
  );
}

export default Profile;
