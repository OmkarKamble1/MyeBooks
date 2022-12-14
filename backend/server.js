const express = require("express");
const multer = require("multer");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/AllRoutes");
const bodyparser = require("body-parser");
const port = process.env.PORT;
const uri =
  "mongodb+srv://admin:admin@ebookmaker.kpixcqc.mongodb.net/?retryWrites=true&w=majority";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/public", express.static("coverimg"));

app.use("/api", routes);

app.get("/", (req, res) => {
  res.json({ message: "server working!" });
});

app.use("/static", express.static("public"));

app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});
