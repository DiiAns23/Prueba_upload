const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();

// Aplicar cors solo de mi sitio web
// app.use(cors({
//   origin: 'http://localhost:8080',
// }));
app.use(cors());

const authUser_svc= async (req, res, next) =>  {
  console.log('Entra en la parte de authUser_svc');
  console.log(req.body);
  next();
}

app.use(authUser_svc);
app.use(express.static("./public"));

const port = process.env.PORT || 3000;

const storage = multer.diskStorage({
  filename: function (res, file, cb) {
    const ext = file.originalname.split(".").pop(); //TODO pdf / jpeg / mp3
    const fileName = Date.now(); //TODO 12312321321
    cb(null, `${fileName}.${ext}`); //TODO 123123213232.pdf
  },
  destination: function (res, file, cb) {
    cb(null, `./public`);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file.filename;
  console.log(file)
  res.send({ data: "OK", url: `http://localhost:3000/${file}` });
});

app.listen(port, () => {
  console.log("Listo por el puerto", port);
});