// app.js

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const app = express();
const port = 3000;

// Gunakan EJS
app.set("view engine", "ejs");
app.use(expressLayout);
// Beri tahu express-ejs-layouts bahwa file layout utama kita adalah 'main.ejs'
app.set("layout", "main");
app.use(express.static("public"));

// Data navigasi
const menu = [
  { name: "Home", url: "/" },
  { name: "About", url: "/about" },
  { name: "Prodi", url: "/prodi" },
  { name: "Contact", url: "/contact" },
];

// Data program studi
const prodi = [
  { nama: "Teknik Elektro", singkatan: "TE", fakultas: "Fakultas Ilmu Komputer & Rekayasa" },
  { nama: "Informatika", singkatan: "IF", fakultas: "Fakultas Ilmu Komputer & Rekayasa" },
  { nama: "Sistem Informasi", singkatan: "SI", fakultas: "Fakultas Ilmu Komputer & Rekayasa" },
  { nama: "Akuntansi", singkatan: "AK", fakultas: "Fakultas Ekonomi & Bisnis" },
  { nama: "Manajemen", singkatan: "MJ", fakultas: "Fakultas Ekonomi & Bisnis" },
];

// Routing
app.get("/", (req, res) => {
  const news = [
    { id: 1, title: "Berita 1", content: "Isi berita 1..." },
    { id: 2, title: "Berita 2", content: "Isi berita 2..." },
  ];
  // Tambahkan 'menu' di sini
  res.render("index", {
    title: "Home",
    menu,
    news,
  });
});

app.get("/prodi", (req, res) => {
  // Tambahkan 'menu' di sini
  res.render("prodi", {
    title: "Prodi",
    menu,
    prodi,
  });
});

app.get("/about", (req, res) => {
  // Tambahkan 'menu' di sini
  res.render("about", {
    title: "About",
    menu,
  });
});

app.get("/contact", (req, res) => {
  // Tambahkan 'menu' di sini
  res.render("contact", {
    title: "Contact",
    menu,
  });
});

// 404 middleware
app.use((req, res) => {
  res.status(404);
  res.send("<h1>404 Not Found</h1>");
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
