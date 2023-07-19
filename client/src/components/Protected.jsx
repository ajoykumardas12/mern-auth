import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Protected = ({ isLoggedIn, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtoken");
    if (token) {
      try {
        const user = jwt_decode(token);
        if (!user) {
          localStorage.removeItem("jwtoken");
          navigate("/signin");
          return;
        }
        //  else {
        //   return children;
        // }
      } catch (err) {
        console.error(err);
        localStorage.removeItem("jwtoken");
        navigate("/signin");
      }
    } else {
      navigate("/signin");
    }
  }, []);

  return children;
};
export default Protected;
