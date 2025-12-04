// Import useState untuk mengelola state
import { useState, useEffect } from "react";
// Import axios untuk melakukan HTTP request
import axios from "axios";
// Import useNavigate untuk navigasi
import { useNavigate, useParams } from "react-router-dom";

export default function EditProdi() {
  //state untuk menyimpan list fakultas (untuk select)
  const [fakultas, setFakultas] = useState([]);

  // useNavigate hook untuk redirect
  const navigate = useNavigate();

  // useParams hook untuk mendapatkan ID dari URL
  const { id } = useParams();

  // State untuk menyimpan nilai input form
  const [formData, setFormData] = useState({
    nama: "",
    singkatan: "",
    fakultas_id: "",
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
      setError("Field Nama dan Singkatan wajib diisi!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Kirim PUT request ke API
      const response = await axios.put(`https://newexpresssi5a-weld.vercel.app/api/Prodi/${id}`, formData);

      console.log("Prodi updated:", response.data);

      // Redirect ke halaman list Prodi
      navigate("/Prodi");
    } catch (err) {
      console.error("Error updating Prodi:", err);
      setError(err.response?.data?.message || err.message || "Terjadi kesalahan saat menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch daftar Fakultas dan data Prodi yang akan diedit
    const fetchData = async () => {
      try {
        setLoading(true);
        const [fakultasRes, prodiRes] = await Promise.all([
          axios.get("https://newexpresssi5a-weld.vercel.app/api/fakultas"),
          axios.get(`https://newexpresssi5a-weld.vercel.app/api/Prodi/${id}`),
        ]);

        setFakultas(Array.isArray(fakultasRes.data) ? fakultasRes.data : []);

        // Set form data dengan data prodi yang diambil
        const p = prodiRes.data;
        setFormData({
          nama: p.nama ?? p.name ?? "",
          singkatan: p.singkatan ?? p.kode ?? "",
          fakultas_id: (p.fakultas_id?._id ?? p.fakultas_id ?? p.fakultas?._id ?? p.fakultas ?? "") || "",
        });

        setError(null);
      } catch (err) {
        setError(err.message || String(err));
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  // Render form dengan navigasi
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Edit Prodi</h2>

      {/* Tampilkan pesan error jika ada */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nama" className="form-label">
            Nama Prodi
          </label>
          <input type="text" className="form-control" id="nama" name="nama" value={formData.nama} onChange={handleChange} placeholder="Contoh: Prodi Teknik" disabled={loading} />
        </div>

        <div className="mb-3">
          <label htmlFor="singkatan" className="form-label">
            Singkatan
          </label>
          <input type="text" className="form-control" id="singkatan" name="singkatan" value={formData.singkatan} onChange={handleChange} placeholder="Contoh: FT" disabled={loading} />
        </div>

        <div className="mb-3">
          <label htmlFor="fakultas_id" className="form-label">
            Fakultas
          </label>
          <select name="fakultas_id" id="fakultas_id" className="form-select" value={formData.fakultas_id} onChange={handleChange} disabled={loading}>
            <option value="" disabled>
              -- Pilih Fakultas --
            </option>
            {fakultas.map((f) => (
              <option key={f._id} value={f._id}>
                {f.nama}
              </option>
            ))}
          </select>
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/Prodi")} disabled={loading}>
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
