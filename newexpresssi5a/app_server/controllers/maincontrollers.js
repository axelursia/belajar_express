const index = (req, res) => {
  res.render("index", { title: "Express", layout: "main" });
};

const about = (req, res) => {
  res.render(`about`, { title: `About Us`, layout: `main` });
};

module.exports = { index, about, contact, prodi };
