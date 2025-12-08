// Import useState untuk mengelola state
import { useState, useEffect } from "react";
// Import axios untuk melakukan HTTP request
import axios from "axios";
// Import useNavigate untuk navigasi
import { useNavigate, useParams } from "react-router-dom";

export default function EditProdi() {
	const [fakultas, setFakultas] = useState([]);
	const navigate = useNavigate();
	const { id } = useParams();

	const [formData, setFormData] = useState({ nama: "", singkatan: "", fakultas_id: "" });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((s) => ({ ...s, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.nama || !formData.singkatan || !formData.fakultas_id) {
			setError("Semua field harus diisi dan fakultas harus dipilih!");
			return;
		}
		setLoading(true);
		try {
			const payload = { nama: formData.nama.trim(), singkatan: formData.singkatan.trim(), fakultas_id: formData.fakultas_id };
			await axios.put(`https://newexpresssi5a-weld.vercel.app/api/Prodi/${id}`, payload);
			navigate("/prodi");
		} catch (err) {
			console.error(err);
			setError(err.response?.data?.message || err.message || "Terjadi kesalahan saat menyimpan data");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const fetch = async () => {
			try {
				setLoading(true);
				const [fRes, pRes] = await Promise.all([axios.get("https://newexpresssi5a-weld.vercel.app/api/fakultas"), axios.get(`https://newexpresssi5a-weld.vercel.app/api/Prodi/${id}`)]);
				setFakultas(Array.isArray(fRes.data) ? fRes.data : []);
				const p = pRes.data;
				setFormData({
					nama: p.nama ?? p.name ?? "",
					singkatan: p.singkatan ?? p.kode ?? "",
					fakultas_id: p.fakultas_id?._id ?? p.fakultas_id ?? p.fakultas?._id ?? p.fakultas ?? "",
				});
				setError(null);
			} catch (err) {
				console.error(err);
				setError(err.message || String(err));
			} finally {
				setLoading(false);
			}
		};
		if (id) fetch();
	}, [id]);

	return (
		<div className="container mt-5">
			<h2 className="mb-4">Edit Prodi</h2>
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
					<input type="text" className="form-control" id="nama" name="nama" value={formData.nama} onChange={handleChange} disabled={loading} />
				</div>
				<div className="mb-3">
					<label htmlFor="singkatan" className="form-label">
						Singkatan
					</label>
					<input type="text" className="form-control" id="singkatan" name="singkatan" value={formData.singkatan} onChange={handleChange} disabled={loading} />
				</div>
				<div className="mb-3">
					<label htmlFor="fakultas_id" className="form-label">
						Fakultas
					</label>
					<select className="form-select" id="fakultas_id" name="fakultas_id" value={formData.fakultas_id} onChange={handleChange} disabled={loading}>
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
					<button type="button" className="btn btn-secondary" onClick={() => navigate("/prodi")} disabled={loading}>
						Batal
					</button>
				</div>
			</form>
		</div>
	);
}

