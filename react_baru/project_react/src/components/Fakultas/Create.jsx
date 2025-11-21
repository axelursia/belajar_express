// Import useState untuk mengelola state
import { useState } from "react";

export default function CreateFakultas() {
  // State untuk menyimpan nilai input form
  const [formData, setFormData] = useState({
    nama: "",
    singkatan: "",
  });

  // Render form dengan state
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Tambah Fakultas</h2>

      {/* Tampilkan state untuk debugging */}
      <div className="alert alert-info">
        <strong>State saat ini:</strong>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>

      <form>
        <div className="mb-3">
          <label htmlFor="nama" className="form-label">
            Nama Fakultas
          </label>
          <input type="text" className="form-control" id="nama" name="nama" value={formData.nama} placeholder="Contoh: Fakultas Teknik" />
        </div>

        <div className="mb-3">
          <label htmlFor="singkatan" className="form-label">
            Singkatan
          </label>
          <input type="text" className="form-control" id="singkatan" name="singkatan" value={formData.singkatan} placeholder="Contoh: FT" />
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
          <button type="button" className="btn btn-secondary">
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
