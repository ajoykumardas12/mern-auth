import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserDetails() {
  const [name, setName] = useState("");

  const navigate = useNavigate();
  async function fetchUserDetails(){
      const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_ENDPOINT}/user-details`,
          {
              headers: {
                  "x-access-token": localStorage.getItem("jwtoken")
              }
          }
      )
      console.log(res);
      setName(res.data);
  }

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const logOut = () => {
    localStorage.removeItem("jwtoken");
    navigate("/login");
  } 

  return (
      <div className="dashboard">
        <div>
          Dashboard
        </div>
        { name &&           
          <div>
            Hello, {name}
          </div>
        }
        <button onClick={logOut}>Log Out</button>
      </div>
  );
}

export default UserDetails;