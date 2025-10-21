const mongoose = require("mongoose"); // impor mongosee

// skema untuk collection prodi
const mahasiswaSchema = new mongoose.Schema({
  npm: {
    type: String,
    required: true,
    trim: true,
  },
  nama: {
    type: String,
    required: true, // wajib diisi
    trim: true,
  },
  tempat_lahir: {
    type: String,
    required: true,
    trim: true,
  },
  tanggal_lahir: {
    type: Date,
    required: true,
    trim: true,
  },
  prodi_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Prodi",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// sertakan skema mahasiswa ke dalam model Mahasiswa
const Mahasiswa = mongoose.model("Mahasiswa", mahasiswaSchema);
// expor model Mahasiswa
module.exports = Mahasiswa;
