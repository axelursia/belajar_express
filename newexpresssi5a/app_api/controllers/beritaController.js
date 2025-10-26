// app_api/controllers/beritaController.js
const Berita = require("../models/berita");

// GET - tampilkan semua berita
const getAllBerita = async (req, res) => {
  try {
    const berita = await Berita.find().sort({ tanggal: -1 }); // urutkan terbaru dulu
    res.status(200).json(berita);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST - tambah berita baru
const createBerita = async (req, res) => {
  try {
    const beritaBaru = new Berita({
      judul: req.body.judul,
      deskripsi: req.body.deskripsi,
      isi: req.body.isi,
      tanggal: req.body.tanggal || Date.now(),
    });

    const hasil = await beritaBaru.save();
    res.status(201).json(hasil);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllBerita, createBerita };
