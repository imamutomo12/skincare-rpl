import { formidable } from "formidable";
import sharp from "sharp";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  console.log("Request received");
  let files;

  try {
    // Verify credentials
    const apiKey = process.env.FACE_API_KEY;
    const apiSecret = process.env.FACE_API_SECRET;
    if (!apiKey || !apiSecret) {
      throw new Error("API credentials missing");
    }

    // Parse form
    const form = formidable({
      uploadDir: "/tmp",
      keepExtensions: true,
      multiples: false,
    });

    const [fields, parsedFiles] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        err ? reject(err) : resolve([fields, files]);
      });
    });
    files = parsedFiles;

    // Validate file
    const file = files.file?.[0];
    if (!file?.filepath) {
      return res.status(400).json({ error: "No valid file uploaded" });
    }

    // Process image to base64
    const imageBuffer = await sharp(file.filepath)
      .resize(4096, 4096, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toBuffer();

    const base64Image = imageBuffer.toString("base64");
    console.log("Base64 length:", base64Image.length);
    console.log("Request body sample:", params.toString().slice(0, 100));

    // API parameters
    const params = new URLSearchParams({
      api_key: apiKey,
      api_secret: apiSecret,
      image_base64: base64Image,
    });

    console.log("Base64 length:", base64Image.length);
    console.log("Request body sample:", params.toString().slice(0, 100));

    // API request
    const response = await fetch(
      "https://api-us.faceplusplus.com/facepp/v1/skinanalyze",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      return res.status(response.status).json({
        error: errorData.error_message || "API request failed",
      });
    }

    return res.status(200).json(await response.json());
  } catch (error) {
    console.error("Processing Error:", error);
    return res.status(500).json({
      error: error.message || "Internal server error",
    });
  } finally {
    // Cleanup
    if (files?.file) {
      files.file.forEach((f) => {
        if (fs.existsSync(f.filepath)) fs.unlinkSync(f.filepath);
      });
    }
  }
}
