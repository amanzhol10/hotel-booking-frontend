import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>🏨 Hotel Booking</div>
      <div style={styles.links}>
        <Link style={styles.link} to="/hotels">Hotels</Link>
        <Link style={styles.link} to="/rooms">Rooms</Link>
        <Link style={styles.link} to="/bookings">My Bookings</Link>
        <button style={styles.btn} onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}

const styles = {
  nav: { display:"flex", justifyContent:"space-between", alignItems:"center", background:"#1a1a2e", padding:"14px 32px" },
  brand: { color:"#e94560", fontSize:"20px", fontWeight:"bold" },
  links: { display:"flex", gap:"20px", alignItems:"center" },
  link: { color:"#fff", textDecoration:"none", fontSize:"15px" },
  btn: { background:"#e94560", color:"#fff", border:"none", padding:"8px 18px", borderRadius:"6px", cursor:"pointer" },
};

export default Navbar;