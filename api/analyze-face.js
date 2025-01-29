import formidable from "formidable";
import sharp from "sharp";
import FormData from "form-data";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = new formidable.IncomingForm({
    uploadDir: "/tmp",
    keepExtensions: true,
  });

  try {
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    let file = files.file;
    if (Array.isArray(file)) {
      file = file[0];
    }

    if (!file) {
      return res.status(400).json({ error: "No image provided" });
    }

    try {
      // Process image and convert to buffer
      const imageBuffer = await sharp(file.filepath).toBuffer();

      // Prepare FormData for Face++ API
      const faceppFormData = new FormData();
      faceppFormData.append("image_file", imageBuffer, {
        filename: file.originalFilename || "upload.jpg",
        contentType: file.mimetype || "image/jpeg",
      });
      faceppFormData.append("api_key", process.env.FACEPP_API_KEY);
      faceppFormData.append("api_secret", process.env.FACEPP_API_SECRET);

      // Call Face++ API
      const faceppResponse = await fetch(
        "https://api-us.faceplusplus.com/facepp/v1/skinanalyze",
        {
          method: "POST",
          body: faceppFormData,
          headers: faceppFormData.getHeaders(),
        }
      );

      if (!faceppResponse.ok) {
        const errorData = await faceppResponse.json();
        throw new Error(`Face++ API Error: ${JSON.stringify(errorData)}`);
      }

      const data = await faceppResponse.json();
      return res.status(200).json(data);
    } catch (error) {
      console.error("Processing error:", error);
      return res.status(500).json({
        error: error.message || "Image processing failed",
      });
    } finally {
      // Clean up temporary file
      if (file?.filepath) {
        fs.unlink(file.filepath, (err) => {
          if (err) console.error("Error cleaning temp file:", err);
        });
      }
    }
  } catch (error) {
    console.error("Form parsing error:", error);
    return res.status(500).json({
      error: error.message || "Error processing form data",
    });
  }
}
