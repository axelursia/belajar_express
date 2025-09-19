const express = require("express"); // impor express
const app = express(); // inisialisasi express
const port = 3000; // port server

// gunakan ejs
app.set("view engine", "ejs");

// routing untuk path / atau root path
app.get("/", (req, res) => {
  //res.send("Hello World!");
  //res.render("index");
  const news = [
    { id: 1, title: "Berita 1", content: "..." },
    { id: 2, title: "Berita 2", content: "..." },
    { id: 3, title: "Berita 3", content: "..." },
  ];
  res.render("index", { news });
});

// routing untuk path /about
app.get("/about", (req, res) => {
  res.render("about");
  //res.send("About Us");
});

// routing untuk path /contact
app.get("/contact", (req, res) => {
  res.render("contact");
  //res.sendFile(__dirname + "/contact.html");
});

app.get("/mahasiswa", (req, res) => {
  res.json({
    status: "Success",
    message: "Data mahasiswa",
    data: ["Axel", "Naufal", "Marcel"],
  });
});

// routing untuk path /fakultas dengan parameter id
app.get("/fakultas/:id", (req, res) => {
  //res.send(`Fakultas id ${req.params.id}`);
  res.send("Fakultas ID: " + req.params.id);
});

// routing untuk path /nilai
app.get("/nilai", (req, res) => {
  res.json({
    status: "succes",
    message: "Data nilai mahasiswa",
    data: [
      { mk: "bahasa indonesia", nilai: "A" },
      { mk: "PAW 1", nilai: "A" },
      { mk: "PAB 1", nilai: "A" },
    ],
  });
});

// middleware untuk menangani error 404
app.use((req, res) => {
  res.status(404);
  res.send("<h1>404 Not Found</h1>");
});

// jalankan server pada port 3000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
