// app_api/models/berita.js
const mongoose = require("mongoose");

const beritaSchema = new mongoose.Schema({
  judul: { type: String, required: true },
  deskripsi: { type: String, required: true },
  isi: { type: String, required: true },
  tanggal: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Berita", beritaSchema);
