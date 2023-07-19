import SignUp from "./components/screens/SignUp";
import LogIn from "./components/screens/Login";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <main className="min-h-screen">
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<LogIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </main>
  );
}

export default App;
