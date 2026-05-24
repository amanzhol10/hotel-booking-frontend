import { useEffect, useState } from "react";
import api from "../api";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({ hotel_id: "", price: "" });

  const load = async () => {
    const res = await api.get("/rooms");
    setRooms(res.data);
  };

  const create = async () => {
    if (!form.hotel_id || !form.price) return;
    await api.post("/rooms", { hotel_id: parseInt(form.hotel_id), price: parseInt(form.price) });
    setForm({ hotel_id: "", price: "" });
    load();
  };

  const remove = async (id) => {
    await api.delete(`/rooms/${id}`);
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>🛏 Rooms</h2>
      <div style={styles.form}>
        <input style={styles.input} placeholder="Hotel ID" value={form.hotel_id}
          onChange={e => setForm({...form, hotel_id: e.target.value})} />
        <input style={styles.input} placeholder="Price" value={form.price}
          onChange={e => setForm({...form, price: e.target.value})} />
        <button style={styles.btn} onClick={create}>Add Room</button>
      </div>
      <div style={styles.grid}>
        {rooms.map(r => (
          <div key={r.ID} style={styles.card}>
            <h3 style={styles.cardTitle}>Room #{r.ID}</h3>
            <p style={styles.info}>🏨 Hotel ID: {r.hotel_id}</p>
            <p style={styles.info}>💰 Price: ${r.price}</p>
            <button style={styles.del} onClick={() => remove(r.ID)}>Delete</button>
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
  input: { padding:"10px", borderRadius:"6px", border:"1px solid #ddd", fontSize:"15px", width:"160px" },
  btn: { background:"#e94560", color:"#fff", border:"none", padding:"10px 20px", borderRadius:"6px", cursor:"pointer" },
  grid: { display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))", gap:"20px" },
  card: { background:"#fff", borderRadius:"10px", padding:"20px", boxShadow:"0 2px 8px rgba(0,0,0,0.1)" },
  cardTitle: { margin:"0 0 10px", color:"#1a1a2e" },
  info: { margin:"4px 0", color:"#555" },
  del: { background:"#ff4d4d", color:"#fff", border:"none", padding:"6px 14px", borderRadius:"6px", cursor:"pointer", marginTop:"10px" },
};

export default Rooms;