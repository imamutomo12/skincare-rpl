import express from "express";
import multer from "multer";
import cors from "cors";
import analyzeFace from "./api/analyze-face.js"; // Use .js extension for ES Modules

const app = express();
app.use(cors());
const upload = multer({ storage: multer.memoryStorage() });

app.post("/api/analyze-face", upload.single("file"), async (req, res) => {
  const vercelReq = {
    method: req.method,
    body: { file: req.file },
  };
  const vercelRes = {
    status: (code) => ({ json: (data) => res.status(code).json(data) }),
  };

  await analyzeFace.default(vercelReq, vercelRes);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Local server running at http://localhost:${PORT}`);
});
