import SignUp from "./components/screens/SignUp";
import LogIn from "./components/screens/Login";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";

function App() {
  return (
    <main className="min-h-screen">
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<LogIn />} />
        {/* Private Routes */}
        <Route path="" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
