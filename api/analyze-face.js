import sharp from "sharp";
import FormData from "form-data";
import fetch from "node-fetch"; // Pastikan Anda mengimpor fetch
import { IncomingMessage } from "http";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false, // Disabling the default body parser as multer will handle it
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const formData = new FormData();
  const apiKey = process.env.FACE_API_KEY;
  const apiSecret = process.env.FACE_API_SECRET;

  try {
    console.log("Received file:", req.file);
    const imageFile = req.file; // Use `req.file` if you are uploading with multer
    if (!imageFile) {
      return res.status(400).json({ error: "No image provided" });
    }

    // Convert uploaded file to buffer
    const buffer = imageFile.buffer;

    // Process image with sharp
    let processedImage = sharp(buffer).jpeg({ quality: 80 }); // Start with 80% quality

    // Get original metadata
    const metadata = await processedImage.metadata();
    let { width, height } = metadata;

    // Resize logic (max 4096px, min 200px)
    if (width > 4096 || height > 4096) {
      processedImage = processedImage.resize({
        width: 4096,
        height: 4096,
        fit: "inside", // Maintain aspect ratio
      });
    }

    // Get resized image buffer
    let resizedBuffer = await processedImage.toBuffer();

    // Check file size (max 2MB)
    if (resizedBuffer.byteLength > 2 * 1024 * 1024) {
      // Reduce quality incrementally if still too large
      resizedBuffer = await sharp(resizedBuffer)
        .jpeg({ quality: 70 }) // Drop to 70% quality
        .toBuffer();
    }

    // Final validation
    const finalMetadata = await sharp(resizedBuffer).metadata();
    if (finalMetadata.width < 200 || finalMetadata.height < 200) {
      return res.status(400).json({ error: "Face too small after resizing" });
    }

    // Create a FormData instance and append the resized buffer
    formData.append("api_key", apiKey);
    formData.append("api_secret", apiSecret);
    formData.append("image_file", resizedBuffer, {
      filename: "resized-image.jpg", // Provide a filename to the file
      contentType: "image/jpeg",
    });

    // Call Face++ API
    const response = await fetch(
      "https://api-us.faceplusplus.com/facepp/v1/skinanalyze",
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();
    return res.status(response.status).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Processing failed" });
  }
}
