import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Hotels from "./pages/Hotels";
import Rooms from "./pages/Rooms";
import Bookings from "./pages/Bookings";
import Navbar from "./components/Navbar";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      {token && <Navbar />}
      <Routes>
        <Route path="/" element={token ? <Navigate to="/hotels" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hotels" element={token ? <Hotels /> : <Navigate to="/login" />} />
        <Route path="/rooms" element={token ? <Rooms /> : <Navigate to="/login" />} />
        <Route path="/bookings" element={token ? <Bookings /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;