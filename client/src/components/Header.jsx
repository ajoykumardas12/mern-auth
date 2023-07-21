import { useSelector } from "react-redux";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="text-2xl font-medium font-leaguespartan mb-10">
      <div>{userInfo && <div>Hello, {userInfo.name}</div>}</div>
    </div>
  );
};

export default Header;
