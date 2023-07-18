import SignUp from "./components/screens/SignUp";
import LogIn from "./components/Login";
import { Routes, Route } from "react-router-dom";
import UserDetails from "./components/UserDetails";
import { useState } from "react";
import Protected from "./components/Protected";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setLoggedIn = () => {
    setIsLoggedIn(true);
  };

  return (
    <main className="min-h-screen">
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<LogIn setLoggedIn={setLoggedIn} />} />
        <Route
          path="/dashboard"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <UserDetails />
            </Protected>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
