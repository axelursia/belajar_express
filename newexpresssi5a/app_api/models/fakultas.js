const mongoose = require("mongoose"); // impor mongosee

// skema untuk collection fakutas
const fakultasSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true, // wajib diisi
    trim: true,
  },
  singkatan: {
    type: String,
    required: true,
    trim: true,
  },
  prodi: [{ type: mongoose.Schema.Types.ObjectId, ref: "Prodi" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// sertakan skema fakultas ke dalam model Fakultas
const Fakultas = mongoose.model("Fakultas", fakultasSchema);
// expor model Fakultas
module.exports = Fakultas;
