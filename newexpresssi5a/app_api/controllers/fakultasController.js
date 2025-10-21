// impor model Fakultas
const fakultas = require("../models/fakultas");

// fungsi untuk mengambil isi collection fakultas
const getAllFakultas = async (req, res) => {
  try {
    // GET collection fakultas
    const result = await fakultas.find().populate("prodi");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFakultas = async (req, res) => {
  // buat intanst
  const fakultas = new fakultas({
    nama: req.body.nama,
    singkatan: req.body.singkatan,
  });

  // simpan data fakultas ke dalam collection
  const hasil = await fakultas.save();
  //beri respon json http created
  res.status(201).json(hasil);
};

// export
module.exports = { getAllFakultas, createFakultas };
