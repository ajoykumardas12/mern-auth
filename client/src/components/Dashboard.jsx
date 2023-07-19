import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { clearCredentials } from "../slices/authSlice";

function Dashboard() {
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();

  async function fetchUserDetails() {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_ENDPOINT}/user-details`,
      {
        headers: {
          "x-access-token": localStorage.getItem("jwtoken"),
        },
      }
    );
    console.log(res);
    setName(res.data);
  }

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(clearCredentials());
      navigate("/signin");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dashboard">
      <div>Dashboard</div>
      {userInfo && <div>Hello, {userInfo.name}</div>}
      <button onClick={logoutHandler}>Log Out</button>
    </div>
  );
}

export default Dashboard;
