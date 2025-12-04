// Import useState untuk mengelola state
import { useState, useEffect } from "react";
// Import axios untuk melakukan HTTP request
import axios from "axios";
// Import useNavigate untuk navigasi
import { useNavigate, useParams } from "react-router-dom";

export default function EditMahasiswa() {
  //state untuk menyimpan list prodi (untuk select)
  const [prodi, setProdi] = useState([]);

  // useNavigate hook untuk redirect
  const navigate = useNavigate();

  // useParams hook untuk mendapatkan ID dari URL
  const { id } = useParams();

  // State untuk menyimpan nilai input form
  const [formData, setFormData] = useState({
    npm: "",
    nama: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    prodi_id: "",
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
    if (!formData.npm || !formData.nama || !formData.prodi_id) {
      setError("Field NPM, Nama, dan Prodi wajib diisi!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Kirim PUT request ke API
      const payload = {
        ...formData,
        prodi_id: formData.prodi_id,
        prodi: formData.prodi_id,
      };

      const response = await axios.put(`https://newexpresssi5a-weld.vercel.app/api/mahasiswa/${id}`, payload);

      console.log("Mahasiswa updated:", response.data);

      // Redirect ke halaman list Mahasiswa
      navigate("/mahasiswa");
    } catch (err) {
      console.error("Error updating Mahasiswa:", err);
      setError(err.response?.data?.message || err.message || "Terjadi kesalahan saat menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch daftar Prodi dan data Mahasiswa yang akan diedit
    const fetchData = async () => {
      try {
        setLoading(true);
        const [prodiRes, mahasiswaRes] = await Promise.all([axios.get("https://newexpresssi5a-weld.vercel.app/api/Prodi"), axios.get(`https://newexpresssi5a-weld.vercel.app/api/mahasiswa/${id}`)]);

        setProdi(Array.isArray(prodiRes.data) ? prodiRes.data : []);

        // Set form data dengan data mahasiswa yang diambil
        const m = mahasiswaRes.data;
        setFormData({
          npm: m.npm ?? m.NPM ?? m.nim ?? "",
          nama: m.nama ?? m.name ?? "",
          tempat_lahir: m.tempat_lahir ?? m.tempatlahir ?? m.tempatLahir ?? "",
          tanggal_lahir: m.tanggal_lahir ?? m.tanggallahir ?? m.tanggalLahir ?? "",
          prodi_id: (m.prodi?._id ?? m.prodi_id ?? m.prodiId ?? m.prodi ?? "") || "",
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
      <h2 className="mb-4">Edit Mahasiswa</h2>

      {/* Tampilkan pesan error jika ada */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="npm" className="form-label">
            NPM
          </label>
          <input type="text" className="form-control" id="npm" name="npm" value={formData.npm} onChange={handleChange} placeholder="Contoh: 1903010001" disabled={loading} />
        </div>

        <div className="mb-3">
          <label htmlFor="nama" className="form-label">
            Nama Mahasiswa
          </label>
          <input type="text" className="form-control" id="nama" name="nama" value={formData.nama} onChange={handleChange} placeholder="Contoh: Budi" disabled={loading} />
        </div>

        <div className="mb-3">
          <label htmlFor="tempat_lahir" className="form-label">
            Tempat Lahir
          </label>
          <input type="text" className="form-control" id="tempat_lahir" name="tempat_lahir" value={formData.tempat_lahir} onChange={handleChange} placeholder="Contoh: Jakarta" disabled={loading} />
        </div>

        <div className="mb-3">
          <label htmlFor="tanggal_lahir" className="form-label">
            Tanggal Lahir
          </label>
          <input type="date" className="form-control" id="tanggal_lahir" name="tanggal_lahir" value={formData.tanggal_lahir} onChange={handleChange} disabled={loading} />
        </div>

        <div className="mb-3">
          <label htmlFor="prodi_id" className="form-label">
            Prodi
          </label>
          <select name="prodi_id" id="prodi_id" className="form-select" value={formData.prodi_id} onChange={handleChange} disabled={loading}>
            <option value="" disabled>
              -- Pilih Prodi --
            </option>
            {prodi.map((p) => (
              <option key={p._id} value={p._id}>
                {p.nama} {p.singkatan ? `(${p.singkatan})` : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/mahasiswa")} disabled={loading}>
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
