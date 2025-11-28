// Komponen list Mahasiswa
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default function MahasiswaList() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [prodiMap, setProdiMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const [mRes, pRes] = await Promise.all([axios.get("https://newexpresssi5a-weld.vercel.app/api/mahasiswa"), axios.get("https://newexpresssi5a-weld.vercel.app/api/Prodi")]);

        const mahasiswaData = Array.isArray(mRes.data) ? mRes.data : [];

        // build prodi map id -> {nama, singkatan}
        const pMap = {};
        if (Array.isArray(pRes.data)) {
          pRes.data.forEach((p) => {
            const rawId = p._id ?? p.id ?? p._doc?._id;
            const id = rawId != null ? String(rawId) : "";
            if (!id) return;
            pMap[id] = {
              nama: p.nama ?? p.name ?? "",
              singkatan: p.singkatan ?? p.kode ?? "",
            };
          });
        }

        setProdiMap(pMap);
        setMahasiswa(mahasiswaData);
        setError(null);
      } catch (err) {
        console.error("Error fetching mahasiswa/prodi", err);
        setError(err.message || String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // useEffect(() => {
  //   // Fungsi async untuk fetch data Prodi dan Fakultas dari API
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       // Ambil Prodi dan Fakultas secara paralel
  //       const [prodiRes, fakultasRes] = await Promise.all([axios.get("https://newexpresssi5a-weld.vercel.app/api/Prodi"), axios.get("https://newexpresssi5a-weld.vercel.app/api/fakultas")]);

  //       // Buat peta id -> nama untuk fakultas
  //       const map = {};
  //       if (Array.isArray(fakultasRes.data)) {
  //         fakultasRes.data.forEach((f) => {
  //           const id = f._id ?? f.id ?? f._doc?._id;
  //           const name = f.nama ?? f.name ?? f.namafakultas ?? f.namasingkatan ?? "";
  //           if (id) map[id] = name;
  //         });
  //       }

  //       setFacultyMap(map);

  //       // Simpan data Prodi
  //       setProdi(prodiRes.data);
  //       setError(null);
  //     } catch (err) {
  //       setError(err.message);
  //       console.error("Error fetching Prodi or Fakultas:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   // Panggil fungsi fetchData
  //   fetchData();
  // }, []); // Dependency array kosong = hanya dijalankan sekali saat mount

  // Fungsi untuk menghapus fakultas berdasarkan ID dengan konfirmasi SweetAlert2
  const handleDelete = (id, nama) => {
    Swal.fire({
      title: "Apakah kamu yakin?",
      text: `Kamu tidak akan bisa mengembalikan ini! Mahasiswa: ${nama}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
    }).then((result) => {
      // Lakukan penghapusan jika dikonfirmasi

      if (result.isConfirmed) {
        // ensure id is a string
        const sid = id != null ? String(id) : id;
        axios
          .delete(`https://newexpresssi5a-weld.vercel.app/api/mahasiswa/${sid}`)
          .then((response) => {
            // Hapus mahasiswa dari state setelah sukses dihapus dari server
            setMahasiswa((prev) =>
              prev.filter((f) => {
                const fid = f._id ?? f.id ?? f.nim ?? f.npm ?? null;
                return String(fid) !== sid;
              })
            );
            // Tampilkan notifikasi sukses
            Swal.fire("Hapus!", "Data kamu sudah dihapus.", "success");
          })
          .catch((error) => {
            console.error("Error menghapus data:", error);
            Swal.fire("Error", "Terdapat masalah saat menghapus data ini.", "error");
          });
      }
    });
  };

  return (
    <div>
      <h1>Mahasiswa List</h1>
      <NavLink to="/mahasiswa/create" className="btn btn-primary mb-3">
        Tambah Mahasiswa
      </NavLink>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>NPM</th>
            <th>Nama</th>
            <th>Tempat Lahir</th>
            <th>Tanggal Lahir</th>
            <th>Prodi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(mahasiswa) &&
            mahasiswa.map((m) => {
              const resolveProdiId = (val) => {
                if (val == null) return "";
                if (typeof val === "object") return String(val._id ?? val.id ?? "");
                return String(val);
              };

              const prodiId = resolveProdiId(m.prodi ?? m.prodi_id ?? m.prodiId ?? m.prodi?._id);
              const prodiName = (prodiId && prodiMap[prodiId]?.nama) || (m.prodi && typeof m.prodi === "string" ? m.prodi : m.prodi?.nama) || "";

              const resolveMahasiswaId = (item) => {
                if (!item) return "";
                const raw = item._id ?? item.id ?? item.nim ?? item.npm ?? null;
                return raw != null ? String(raw) : "";
              };

              const mId = resolveMahasiswaId(m);

              return (
                <tr key={m._id ?? m.npm ?? Math.random()}>
                  <td>{m.npm ?? m.NPM ?? m.nim ?? ""}</td>
                  <td>{m.nama ?? m.name ?? ""}</td>
                  <td>{m.tempat_lahir ?? m.tempatlahir ?? m.tempatLahir ?? ""}</td>
                  <td>{m.tanggal_lahir ?? m.tanggallahir ?? m.tanggalLahir ?? ""}</td>
                  <td>{prodiName || prodiId}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleDelete(mId, m.nama ?? m.name)}>
                      Hapus
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
