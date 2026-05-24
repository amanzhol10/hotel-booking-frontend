import { useEffect, useState } from "react";
import api from "../api";

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [name, setName] = useState("");

  const load = async () => {
    const res = await api.get("/hotels");
    setHotels(res.data);
  };

  const create = async () => {
    if (!name) return;
    await api.post("/hotels", { name });
    setName("");
    load();
  };

  const remove = async (id) => {
    await api.delete(`/hotels/${id}`);
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>🏨 Hotels</h2>
      <div style={styles.form}>
        <input style={styles.input} placeholder="Hotel name" value={name}
          onChange={e => setName(e.target.value)} />
        <button style={styles.btn} onClick={create}>Add Hotel</button>
      </div>
      <div style={styles.grid}>
        {hotels.map(h => (
          <div key={h.ID} style={styles.card}>
            <h3 style={styles.cardTitle}>{h.name}</h3>
            <p style={styles.cardId}>ID: {h.ID}</p>
            <button style={styles.del} onClick={() => remove(h.ID)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: { padding:"30px", background:"#f4f6f9", minHeight:"100vh" },
  title: { color:"#1a1a2e", marginBottom:"20px" },
  form: { display:"flex", gap:"10px", marginBottom:"30px" },
  input: { padding:"10px", borderRadius:"6px", border:"1px solid #ddd", fontSize:"15px", width:"260px" },
  btn: { background:"#e94560", color:"#fff", border:"none", padding:"10px 20px", borderRadius:"6px", cursor:"pointer" },
  grid: { display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(220px, 1fr))", gap:"20px" },
  card: { background:"#fff", borderRadius:"10px", padding:"20px", boxShadow:"0 2px 8px rgba(0,0,0,0.1)" },
  cardTitle: { margin:"0 0 8px", color:"#1a1a2e" },
  cardId: { margin:"0 0 12px", color:"#888", fontSize:"13px" },
  del: { background:"#ff4d4d", color:"#fff", border:"none", padding:"6px 14px", borderRadius:"6px", cursor:"pointer" },
};

export default Hotels;