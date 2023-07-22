import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { clearCredentials } from "../slices/authSlice";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import DashboardIcon from "./icons/DashboardIcon";
import LogoutIcon from "./icons/LogoutIcon";
import ProfileIcon from "./icons/ProfileIcon";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

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
    <div className="min-h-full mr-10 flex flex-col font-leaguespartan">
      <div>
        <div className="flex items-center gap-1 text-2xl font-leaguespartan">
          <div className="mb-1">
            <Logo />
          </div>
          <h1 className="">Reveal</h1>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-2">
        <Link
          to="/dashboard"
          className={`flex items-center gap-2 pl-2 pr-4 py-1 rounded-md ${
            pathname === "/dashboard" && "bg-light"
          } hover:bg-light`}
        >
          <DashboardIcon iconClass="stroke-1" />
          <h3 className="pt-1">Dashboard</h3>
        </Link>
        <Link
          to="/profile"
          className={`flex items-center gap-2 pl-2 pr-4 py-1 rounded-md ${
            pathname === "/profile" && "bg-light"
          } hover:bg-light`}
        >
          <ProfileIcon iconClass="stroke-1" />
          <h3 className="pt-1">Profile</h3>
        </Link>
        <button
          onClick={logoutHandler}
          className="flex items-center gap-2 pl-2 pr-4 py-1 rounded-md hover:bg-light"
        >
          <LogoutIcon iconClass="stroke-1" />
          <div className="pt-0.5">Log out</div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
