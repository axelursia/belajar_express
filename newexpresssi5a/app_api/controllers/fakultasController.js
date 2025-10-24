// impor model Fakultas
const fakultasSchema = require("../models/fakultas");

// fungsi untuk mengambil isi collection fakultas
const getAllFakultas = async (req, res) => {
  try {
    // GET collection fakultas
    const result = await fakultasSchema.find().populate("prodi");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// fungsi untuk mengambil isi collection fakultas bersaarkan parameter id
const getFakultasById = async (req, res) => {
  try {
    // GET collection fakultas berdasarkan id
    const result = await fakultasSchema.findById(req.params.id);
    if (!result) {
      res.status(404).json({ message: "Fakultas not found" });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateFakultasById = async (req, res) => {
  try {
    // GET collection fakultas berdasarkan id
    const result = await fakultasSchema.findById(req.params.id);
    if (!result) {
      res.status(404).json({ message: "Fakultas not found" });
    } else {
      if (req.body.nama != null) {
        result.nama = req.body.nama;
      }
      if (req.body.singkatan != null) {
        result.singkatan = req.body.singkatan;
      }

      const updateFakultas = await result.save();
      res.status(200).json(updateFakultas);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteFakultasById = async (req, res) => {
  try {
    // GET collection fakultas berdasarkan id
    const result = await fakultasSchema.findById(req.params.id);
    if (!result) {
      res.status(404).json({ message: "Fakultas not found" });
    } else {
      await result.deleteOne();
      res.status(200).json({ message: "Fakultas deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFakultas = async (req, res) => {
  // // buat intanst
  const fakultas = new fakultasSchema({
    nama: req.body.nama,
    singkatan: req.body.singkatan,
  });
  // simpan data fakultas ke dalam collection
  const hasil = await fakultas.save();
  //beri respon json http created
  res.status(201).json(hasil);
};

// export
module.exports = { getAllFakultas, getFakultasById, createFakultas, deleteFakultasById, updateFakultasById };
