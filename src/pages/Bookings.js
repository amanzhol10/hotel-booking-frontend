import { useEffect, useState } from "react";
import api from "../api";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [roomId, setRoomId] = useState("");

  const load = async () => {
    const res = await api.get("/bookings");
    setBookings(res.data);
  };

  const create = async () => {
    if (!roomId) return;
    await api.post("/bookings", { room_id: parseInt(roomId), user_id: 1 });
    setRoomId("");
    load();
  };

  const remove = async (id) => {
    await api.delete(`/bookings/${id}`);
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>📋 My Bookings</h2>
      <div style={styles.form}>
        <input style={styles.input} placeholder="Room ID" value={roomId}
          onChange={e => setRoomId(e.target.value)} />
        <button style={styles.btn} onClick={create}>Book Room</button>
      </div>
      <div style={styles.grid}>
        {bookings.map(b => (
          <div key={b.ID} style={styles.card}>
            <h3 style={styles.cardTitle}>Booking #{b.ID}</h3>
            <p style={styles.info}>🛏 Room ID: {b.room_id}</p>
            <p style={styles.info}>👤 User ID: {b.user_id}</p>
            <button style={styles.del} onClick={() => remove(b.ID)}>Cancel</button>
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

export default Bookings;