import SignUp from "./components/screens/SignUp";
import LogIn from "./components/screens/Login";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
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
        <Route path="/signin" element={<LogIn setLoggedIn={setLoggedIn} />} />
        <Route
          path="/dashboard"
          element={
            // <Protected isLoggedIn={isLoggedIn}>
            <Dashboard />
            // {/* </Protected> */}
          }
        />
      </Routes>
    </main>
  );
}

export default App;
