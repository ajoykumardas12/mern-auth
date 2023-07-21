import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { clearCredentials } from "../slices/authSlice";
import { Link } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();

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
      <Link to="/profile">Edit profile</Link>
      <button onClick={logoutHandler}>Log Out</button>
    </div>
  );
}

export default Dashboard;
