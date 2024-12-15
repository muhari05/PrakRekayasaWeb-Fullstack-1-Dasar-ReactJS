import React, { useState } from "react";
import './App.css';

function App() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [form, setForm] = useState({ nim: "", nama_mahasiswa: "", fakultas: "", jurusan: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [message, setMessage] = useState("");

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Tambahkan mahasiswa baru atau update mahasiswa
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...mahasiswa];
      updated[editIndex] = form;
      setMahasiswa(updated);
      setMessage("Berhasil mengupdate data!");
    } else {
      setMahasiswa([...mahasiswa, form]);
      setMessage("Berhasil menambahkan data!");
    }
    setForm({ nim: "", nama_mahasiswa: "", fakultas: "", jurusan: "" });
    setEditIndex(null);
  };

  // Hapus mahasiswa
  const handleDelete = (index) => {
    const filtered = mahasiswa.filter((_, i) => i !== index);
    setMahasiswa(filtered);
    setMessage("Berhasil menghapus data!");
  };

  // Set data mahasiswa untuk diedit
  const handleEdit = (index) => {
    setForm(mahasiswa[index]);
    setEditIndex(index);
    setMessage("Mengedit data mahasiswa...");
  };

  return (
    <div className="container">
      <h1>CRUD Data Mahasiswa (Fullstack1 ReactJS)</h1>

      {/* Form Tambah/Edit Mahasiswa */}
      <form onSubmit={handleSubmit}>
        <input
          name="nim"
          placeholder="NIM"
          value={form.nim}
          onChange={handleChange}
          required
        />
        <input
          name="nama_mahasiswa"
          placeholder="Nama Mahasiswa"
          value={form.nama_mahasiswa}
          onChange={handleChange}
          required
        />
        <select name="fakultas" value={form.fakultas} onChange={handleChange} required>
          <option value="">Pilih Fakultas</option>
          <option value="FTIK">FTIK</option>
          <option value="Psikologi">Psikologi</option>
          <option value="Hukum">Hukum</option>
          <option value="Ekonomi">Ekonomi</option>
          <option value="Teknik">Teknik</option>
        </select>
        <input
          name="jurusan"
          placeholder="Jurusan"
          value={form.jurusan}
          onChange={handleChange}
          required
        />
        <button type="submit">{editIndex !== null ? "Update" : "Tambah"}</button>
        {editIndex !== null && (
          <button
            type="button"
            onClick={() => {
              setForm({ nim: "", nama_mahasiswa: "", fakultas: "", jurusan: "" });
              setEditIndex(null);
              setMessage("Batal mengedit data mahasiswa.");
            }}
          >
            Batal
          </button>
        )}
      </form>

      {/* Pesan Notifikasi */}
      {message && <p>{message}</p>}

      {/* Tabel Mahasiswa */}
      <table border="1">
        <thead>
          <tr>
            <th>NIM</th>
            <th>Nama</th>
            <th>Fakultas</th>
            <th>Jurusan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {mahasiswa.length > 0 ? (
            mahasiswa.map((mhs, index) => (
              <tr key={index}>
                <td>{mhs.nim}</td>
                <td>{mhs.nama_mahasiswa}</td>
                <td>{mhs.fakultas}</td>
                <td>{mhs.jurusan}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Hapus</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Data kosong</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Total Jumlah Data */}
      <p>Total jumlah data mahasiswa: {mahasiswa.length}</p>
    </div>
  );
}

export default App;
