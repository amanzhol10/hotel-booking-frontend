import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    try {
      const res = await api.post("/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/hotels");
    } catch {
      setError("Wrong email or password");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🏨 Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input style={styles.input} placeholder="Email" value={form.email}
          onChange={e => setForm({...form, email: e.target.value})} />
        <input style={styles.input} placeholder="Password" type="password" value={form.password}
          onChange={e => setForm({...form, password: e.target.value})} />
        <button style={styles.btn} onClick={submit}>Login</button>
        <p style={styles.bottom}>No account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}

const styles = {
  container: { display:"flex", justifyContent:"center", alignItems:"center", height:"100vh", background:"#0f3460" },
  card: { background:"#fff", padding:"40px", borderRadius:"12px", width:"340px", display:"flex", flexDirection:"column", gap:"14px" },
  title: { textAlign:"center", margin:0, color:"#1a1a2e" },
  input: { padding:"10px", borderRadius:"6px", border:"1px solid #ddd", fontSize:"15px" },
  btn: { background:"#e94560", color:"#fff", border:"none", padding:"12px", borderRadius:"6px", fontSize:"16px", cursor:"pointer" },
  error: { color:"red", margin:0, textAlign:"center" },
  bottom: { textAlign:"center", margin:0 },
};

export default Login;