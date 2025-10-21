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

// export
module.exports = { getAllFakultas };
