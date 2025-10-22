import axios from "axios";
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState(""); 
  const [cls, setCls] = useState("");
  const [id, setId] = useState("");
  const [roll, setRoll] = useState("");
  const [editId, setEditId] = useState(null);

  const API = "https://cricketserver-tuhr.onrender.com/students";

 
  useEffect(() => {
    axios.get(API).then((res) => setStudents(res.data));
  }, []);

  const handleAdd = () => {
    if (!name || !cls || !id || !roll) {
      alert("Fill all fields!");
      return;
    }

    const newStudent = { name, cls, id, roll };

    if (editId) {
      axios.put(`${API}/${editId}`, newStudent).then(() => {
        setEditId(null);
        loadData();
      });
    } else {
      axios.post(API, newStudent).then(() => loadData());
    }

    setName("");
    setCls("");
    setId("");
    setRoll("");
  };

  const loadData = () => {
    axios.get(API).then((res) => setStudents(res.data));
  };

  const handleDelete = (id) => {
    axios.delete(`${API}/${id}`).then(() => loadData());
  };

  const handleEdit = (student) => {
    setName(student.name);
    setCls(student.cls);
    setId(student.id);
    setRoll(student.roll);
    setEditId(student.id);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>🏏 Cricket Player Details</h1> 
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Player Name" />{" "}
      <input value={cls} onChange={(e) => setCls(e.target.value)} placeholder="Team" />{" "}
      <input value={id} onChange={(e) => setId(e.target.value)} placeholder="Player ID" />{" "}
      <input value={roll} onChange={(e) => setRoll(e.target.value)} placeholder="Jersey No" />{" "}
      <button onClick={handleAdd}>{editId ? "Update" : "Add"}</button>
      <table border="1" width="80%" align="center" cellPadding="10">
        <thead style={{ backgroundColor: "#c58888ff" }}>
          <tr>
            <th>Player Name</th>
            <th>Team</th>
            <th>Player ID</th>
            <th>Jersey No</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((stu) => (
            <tr key={stu.id}>
              <td>{stu.name}</td>
              <td>{stu.cls}</td>
              <td>{stu.id}</td>
              <td>{stu.roll}</td>
              <td>
                <button onClick={() => handleEdit(stu)}>Edit</button>{" "}
                <button onClick={() => handleDelete(stu.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;