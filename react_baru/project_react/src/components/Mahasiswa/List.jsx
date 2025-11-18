// Komponen list Mahasiswa
import { useState, useEffect } from "react";
import axios from "axios";

export default function MahasiswaList() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [prodiMap, setProdiMap] = useState({});
  const [facultyMap, setFacultyMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const [mRes, pRes, fRes] = await Promise.all([
          axios.get("https://newexpresssi5a-weld.vercel.app/api/mahasiswa"),
          axios.get("https://newexpresssi5a-weld.vercel.app/api/Prodi"),
          axios.get("https://newexpresssi5a-weld.vercel.app/api/fakultas"),
        ]);

        // DEBUG: print one sample from each response to help map fields (remove in production)
        try {
          // safe logging: may be undefined
          // eslint-disable-next-line no-console
          console.log("[debug] mahasiswa sample:", Array.isArray(mRes.data) ? mRes.data[0] : mRes.data);
          // eslint-disable-next-line no-console
          console.log("[debug] prodi sample:", Array.isArray(pRes.data) ? pRes.data[0] : pRes.data);
          // eslint-disable-next-line no-console
          console.log("[debug] fakultas sample:", Array.isArray(fRes.data) ? fRes.data[0] : fRes.data);
        } catch (err) {
          // ignore logging errors
        }

        // build prodi map id -> {nama, singkatan, fakultasId}
        const pMap = {};
        if (Array.isArray(pRes.data)) {
          pRes.data.forEach((p) => {
            const id = p._id ?? p.id ?? p._doc?._id;
            // prodi may reference fakultas using fakultas_id or fakultas
            const fakultasId = p.fakultas_id?._id ?? p.fakultas_id ?? p.fakultas?._id ?? p.fakultas ?? null;
            pMap[id] = {
              nama: p.nama ?? p.name ?? "",
              singkatan: p.singkatan ?? p.kode ?? "",
              fakultasId,
            };
          });
        }

        // build faculty map id -> nama (sama seperti Prodi/List.jsx)
        const fMap = {};
        if (Array.isArray(fRes.data)) {
          fRes.data.forEach((f) => {
            const id = f._id ?? f.id ?? f._doc?._id;
            fMap[id] = f.nama ?? f.name ?? f.namafakultas ?? f.namasingkatan ?? "";
          });
        }

        setProdiMap(pMap);
        setFacultyMap(fMap);
        setMahasiswa(mRes.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching mahasiswa/prodi/fakultas", err);
        setError(err.message || String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Mahasiswa List</h1>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>NPM</th>
            <th>Nama</th>
            <th>Tempat Lahir</th>
            <th>Tanggal Lahir</th>
            <th>Nama Prodi</th>
            <th>Singkatan Prodi</th>
            <th>Nama Fakultas</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(mahasiswa) &&
            mahasiswa.map((m) => {
              // resolve prodi info (support object or id)
              const prodiId = m.prodi?._id ?? m.prodi ?? m.prodiId ?? m.prodi_id ?? null;
              const prodiInfo =
                prodiMap[prodiId] ??
                (m.prodi && typeof m.prodi === "object"
                  ? {
                      nama: m.prodi.nama ?? m.prodi.name,
                      singkatan: m.prodi.singkatan,
                      fakultasId: m.prodi.fakultas_id?._id ?? m.prodi.fakultas_id ?? m.prodi.fakultas?._id ?? m.prodi.fakultas,
                    }
                  : {});

              // resolve fakultas id and name
              const fakultasId = prodiInfo.fakultasId ?? m.fakultas_id?._id ?? m.fakultas_id ?? null;
              const fakultasNama = facultyMap[fakultasId] ?? m.fakultas_id?.nama ?? m.namafakultas ?? m.namaFakultas ?? "";

              return (
                <tr key={m._id ?? m.npm ?? Math.random()}>
                  <td>{m.npm ?? m.NPM ?? m.nim ?? ""}</td>
                  <td>{m.nama ?? m.name ?? ""}</td>
                  <td>{m.tempat_lahir ?? m.tempatlahir ?? m.tempatLahir ?? ""}</td>
                  <td>{m.tanggal_lahir ?? m.tanggallahir ?? m.tanggalLahir ?? ""}</td>
                  <td>{prodiInfo.nama ?? m.prodi?.nama ?? ""}</td>
                  <td>{prodiInfo.singkatan ?? m.prodi?.singkatan ?? ""}</td>
                  <td>{fakultasNama}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
