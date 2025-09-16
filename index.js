const express = require("express"); // impor express
const app = express(); // inisialisasi express
const port = 3000; // port server

// routing untuk path / atau root path
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// routing untuk path /about
app.get("/about", (req, res) => {
  res.send("About Us");
});

// routing untuk path /contact
app.get("/contact", (req, res) => {
  res.send("Contact Us");
});

app.get("/cihuy", (req, res) => {
  res.send("muantap banget");
});

// jalankan server pada port 3000
app.listen(port, () => {
  console.log(`Server dapat diakses : http://localhost:${port}`);
});
