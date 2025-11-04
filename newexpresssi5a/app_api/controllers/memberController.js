const Member = require("../models/Member");

// CREATE
exports.createMember = async (req, res) => {
  try {
    const member = await Member.create(req.body);
    res.status(201).json({ success: true, message: "Anggota ditambahkan", data: member });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// READ (all) + populate project
exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().populate("projectId", "nama_proyek deskripsi");
    res.json({ success: true, data: members });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// READ (by ID)
exports.getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id).populate("projectId", "nama_proyek");
    if (!member) return res.status(404).json({ message: "Anggota tidak ditemukan" });
    res.json({ success: true, data: member });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// UPDATE
exports.updateMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, message: "Anggota diperbarui", data: member });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE
exports.deleteMember = async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Anggota dihapus" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
