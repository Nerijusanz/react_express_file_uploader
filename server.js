import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";

const app = express();

app.use(cors());
app.use(fileUpload());

app.post("/upload", (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "no file uploaded" });

  const { file } = req.files;

  const fileUploadPath = `${__dirname}/client/public/uploads/${file.name}`;

  file.mv(fileUploadPath, err => {
    if (err) return res.status(500).send(err);

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

const PORT = process.env.LISTEN_PORT || 5000;

app.listen(PORT, () => console.log(`server running on localhost:${PORT}`));
