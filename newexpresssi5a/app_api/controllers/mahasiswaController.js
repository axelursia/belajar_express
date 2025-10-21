// impor model Mahasiswa
const mahasiswa = require("../models/mahasiswa");

// fungsi untuk mengambil isi collection mahasiswa
const getAllMahasiswa = async (req, res) => {
  try {
    // GET collection prodi
    // const result = await mahasiswa.find().populate("prodi_id", "nama singkatan")
    const result = await mahasiswa.find().populate([
      {
        path: "prodi_id",
        select: "nama singkatan",
        populate: {
          path: "fakultas_id",
          select: "nama",
        },
      },
    ]);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export
module.exports = { getAllMahasiswa };
