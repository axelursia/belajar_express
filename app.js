const express = require("express"); // impor express
const expressLayout = require("express-ejs-layouts"); // impor express-ejs-layouts
const app = express(); // inisialisasi express
const port = 3000; // port server

// gunakan ejs
app.set("view engine", "ejs");

app.set("layout", "main"); // set layout utama
app.use(express.static("public")); // gunakan folder public sebagai static file

app.use(expressLayout); // gunakan express-ejs-layouts

// data navigasi (tambahan untuk semua view)
const menu = [
  { name: "Home", url: "/" },
  { name: "About Us", url: "/about" },
  { name: "Prodi", url: "/prodi" },
  { name: "Contact Us", url: "/contact" },
];

// data program studi
const prodi = [
  { nama: "Sistem Informasi", singkatan: "SI", fakultas: "Fakultas Ilmu Komputer dan Rekayasa" },
  { nama: "Informatika", singkatan: "IF", fakultas: "Fakultas Ilmu Komputer dan Rekayasa" },
  { nama: "Manajemen Informatika", singkatan: "MI", fakultas: "Fakultas Ilmu Komputer dan Rekayasa" },
  { nama: "Teknik Elektro", singkatan: "TE", fakultas: "Fakultas Ilmu Komputer dan Rekayasa" },
  { nama: "Akuntansi", singkatan: "AK", fakultas: "Fakultas Ekonomi dan Bisnis" },
  { nama: "Manajemen", singkatan: "MJ", fakultas: "Fakultas Ekonomi dan Bisnis" },
];

// routing untuk path / atau root path
app.get("/", (req, res) => {
  // contoh data berita (belum dipakai di view saat ini)

  const news = [
    { id: 1, title: "Berita 1", content: "..." },
    { id: 2, title: "Berita 2", content: "..." },
    { id: 3, title: "Berita 3", content: "..." },
  ];
  res.render("index", { news, title: "Home", layout: "main" });
});

// routing prodi
app.get("/prodi", (req, res) => {
  res.render("prodi", { prodi, title: "Prodi", layout: "main" });
});

// routing untuk path /about
app.get("/about", (req, res) => {
  res.render("about", { title: "About Us", layout: "main" });
  //res.render("about", { menu });
});

// routing untuk path /contact
app.get("/contact", (req, res) => {
  res.render("contact", { title: "contact Us", layout: "main" });
});

// routing untuk path /mahasiswa (JSON, bukan EJS)
/*
app.get("/mahasiswa", (req, res) => {
  res.json({
    status: "Success",
    message: "Data mahasiswa",
    data: ["Axel", "Naufal", "Marcel"],
  });
});
*/

// routing untuk path /fakultas dengan parameter id
/*
app.get("/fakultas/:id", (req, res) => {
  res.send("Fakultas ID: " + req.params.id);
});
*/

// routing untuk path /nilai
/*
app.get("/nilai", (req, res) => {
  res.json({
    status: "success",
    message: "Data nilai mahasiswa",
    data: [
      { mk: "Bahasa Indonesia", nilai: "A" },
      { mk: "PAW 1", nilai: "A" },
      { mk: "PAB 1", nilai: "A" },
    ],
  });
});
*/

// middleware untuk menangani error 404
app.use((req, res) => {
  res.status(404);
  res.send("<h1>404 Not Found</h1>");
});

// jalankan server pada port 3000
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
