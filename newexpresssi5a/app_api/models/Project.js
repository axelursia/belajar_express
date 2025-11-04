const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    nama_proyek: { type: String, required: true },
    deskripsi: { type: String },
    deadline: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
