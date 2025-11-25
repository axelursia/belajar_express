// Import useState untuk mengelola state
import { useState, useEffect } from "react";
// Import axios untuk melakukan HTTP request
import axios from "axios";
// Import useNavigate untuk navigasi
import { useNavigate } from "react-router-dom";

export default function CreateMahasiswa() {
  //state untuk menyimpan lis Mahasiswa (API)
  const [mahasiswa, setMahasiswa] = useState([]);

  // useNavigate hook untuk redirect
  const navigate = useNavigate();

  // State untuk menyimpan nilai input form
  const [formData, setFormData] = useState({
    nama: "",
    singkatan: "",
    Mahasiswa_id: "",
  });

  // State untuk menyimpan pesan error
  const [error, setError] = useState(null);

  // State untuk menandakan proses loading
  const [loading, setLoading] = useState(false);

  // Fungsi untuk handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fungsi untuk handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!formData.nama || !formData.singkatan) {
      setError("Semua field harus diisi!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Kirim POST request ke API
      const response = await axios.post("https://newexpresssi5a-weld.vercel.app/api/Mahasiswa", formData);

      console.log("Mahasiswa created:", response.data);

      // Redirect ke halaman list Mahasiswa
      navigate("/Mahasiswa");
    } catch (err) {
      console.error("Error creating Mahasiswa:", err);
      setError(err.response?.data?.message || err.message || "Terjadi kesalahan saat menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fungsi async untuk fetch data dari API
    const fetchMahasiswa = async () => {
      try {
        // Set loading true sebelum fetch data
        setLoading(true);
        // Mengambil data dari API menggunakan axios
        const response = await axios.get("https://newexpresssi5a-weld.vercel.app/api/Mahasiswa");
        // Simpan data yang diterima ke state Mahasiswa
        setMahasiswa(response.data);
        // Reset error jika fetch berhasil
        setError(null);
      } catch (err) {
        // Jika terjadi error, simpan pesan error ke state
        setError(err.message);
        console.error("Error fetching Mahasiswa:", err);
      } finally {
        // Set loading false setelah proses selesai (berhasil atau gagal)
        setLoading(false);
      }
    };

    // Panggil fungsi fetchMahasiswa
    fetchMahasiswa();
  }, []); // Dependency array kosong = hanya dijalankan sekali saat mount

  // Render form dengan navigasi
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Tambah Mahasiswa</h2>

      {/* Tampilkan pesan error jika ada */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nama" className="form-label">
            Nama Mahasiswa
          </label>
          <input type="text" className="form-control" id="nama" name="nama" value={formData.nama} onChange={handleChange} placeholder="Contoh: Mahasiswa Teknik" disabled={loading} />
        </div>

        <div className="mb-3">
          <label htmlFor="singkatan" className="form-label">
            Singkatan
          </label>
          <input type="text" className="form-control" id="singkatan" name="singkatan" value={formData.singkatan} onChange={handleChange} placeholder="Contoh: FT" disabled={loading} />
        </div>

        <div className="mb-3">
          <label htmlFor="Mahasiswa_id" className="form-label">
            ID Mahasiswa
          </label>
          <select name="Mahasiswa_id" id="Mahasiswa_id" value={formData.Mahasiswa_id} onchange={handleChange} className="form-control">
            {Mahasiswa.map((MahasiswaItem) => (
              <option key={MahasiswaItem._id} value={MahasiswaItem._id}>
                {MahasiswaItem.nama}
              </option>
            ))}
          </select>
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/Mahasiswa")} disabled={loading}>
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
