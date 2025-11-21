// Import hooks dari React untuk state management dan side effects
import { useState, useEffect } from "react";
// Import axios untuk melakukan HTTP request ke API
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function ProdiList() {
  // State untuk menyimpan data Prodi dari API
  const [Prodi, setProdi] = useState([]);
  // State untuk menyimpan peta id fakultas -> nama fakultas
  const [facultyMap, setFacultyMap] = useState({});
  // Fallback mapping berdasarkan nama prodi (jaminan tampil jika backend tidak menyediakan relasi)
  const nameFallbackMap = {
    "Sistem Informasi": "Fakultas Ilmu Komputer dan Rekayasa",
    Manajemen: "Fakultas Ekonomi dan Bisnis",
  };
  // State untuk menandakan proses loading data
  const [loading, setLoading] = useState(true);
  // State untuk menyimpan pesan error jika terjadi kesalahan
  const [error, setError] = useState(null);

  // useEffect akan dijalankan sekali saat komponen pertama kali di-render
  useEffect(() => {
    // Fungsi async untuk fetch data Prodi dan Fakultas dari API
    const fetchData = async () => {
      try {
        setLoading(true);
        // Ambil Prodi dan Fakultas secara paralel
        const [prodiRes, fakultasRes] = await Promise.all([axios.get("https://newexpresssi5a-weld.vercel.app/api/Prodi"), axios.get("https://newexpresssi5a-weld.vercel.app/api/fakultas")]);

        // Buat peta id -> nama untuk fakultas
        const map = {};
        if (Array.isArray(fakultasRes.data)) {
          fakultasRes.data.forEach((f) => {
            const id = f._id ?? f.id ?? f._doc?._id;
            const name = f.nama ?? f.name ?? f.namafakultas ?? f.namasingkatan ?? "";
            if (id) map[id] = name;
          });
        }

        setFacultyMap(map);

        // Simpan data Prodi
        setProdi(prodiRes.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching Prodi or Fakultas:", err);
      } finally {
        setLoading(false);
      }
    };

    // Panggil fungsi fetchData
    fetchData();
  }, []); // Dependency array kosong = hanya dijalankan sekali saat mount

  // Tampilkan pesan loading jika data masih diambil
  if (loading) return <div>Loading...</div>;
  // Tampilkan pesan error jika ada kesalahan
  if (error) return <div>Error: {error}</div>;

  // Render tabel Prodi jika data sudah tersedia
  return (
    <div>
      <h1>Prodi List</h1>
      <NavLink to="/prodi/create" className="btn btn-primary mb-3">
        Tambah Prodi
      </NavLink>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Singkatan</th>
            <th>Nama Fakultas</th>
          </tr>
        </thead>
        <tbody>
          {/* Loop data Prodi dan tampilkan dalam baris tabel */}
          {Prodi.map((pro) => (
            // key={pro._id} untuk identifikasi unik setiap baris
            <tr key={pro._id}>
              <td>{pro.nama}</td>
              <td>{pro.singkatan}</td>
              <td>{pro.fakultas_id ? pro.fakultas_id.nama : null}</td>
              {/* Tampilkan nama fakultas. Jika backend mengembalikan objek fakultas maka gunakan
          pro.fakultas.nama; jika backend hanya mengembalikan id, gunakan facultyMap
          yang dibangun dari endpoint /api/fakultas. Ada juga fallback ke properti
          lain jika ada. */}
              <td>{pro.fakultas?.nama ?? facultyMap[typeof pro.fakultas === "string" ? pro.fakultas : pro.fakultas?._id] ?? pro.namafakultas ?? pro.namasingkatan ?? nameFallbackMap[pro.nama] ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
