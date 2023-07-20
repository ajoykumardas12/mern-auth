import SignUp from "./components/screens/SignUp";
import LogIn from "./components/screens/Login";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <main className="min-h-screen">
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<LogIn />} />
        {/* Private Routes */}
        <Route path="" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
