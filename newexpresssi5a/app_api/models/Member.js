const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    nama_anggota: { type: String, required: true },
    peran: { type: String, required: true },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project", // relasi ke Project
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Member", memberSchema);
