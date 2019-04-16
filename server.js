import express from "express";
import fileUpload from "express-fileupload";

const app = express();

app.get("/test", (req, res) => {
  return res.json({ test: "OK" });
});

const PORT = process.env.LISTEN_PORT || 5000;

app.listen(PORT, () => console.log(`server running on localhost:${PORT}`));
