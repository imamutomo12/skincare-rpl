import { formidable } from "formidable";
import sharp from "sharp";
import FormData from "form-data";
import fs from "fs";
import { Readable } from "stream";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  console.log("Request received");
  // Declare files at the top level
  let files;
  try {
    const apiKey = process.env.FACE_API_KEY;
    const apiSecret = process.env.FACE_API_SECRET;
    if (!apiKey || !apiSecret) {
      throw new Error("Face++ API credentials not configured");
    }

    const form = formidable({
      uploadDir: "/tmp",
      keepExtensions: true,
    });

    // Parse form with proper error handling
    [_, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    console.log("Form parsed successfully");

    const file = files.file?.[0];
    if (!file) {
      return res.status(400).json({ error: "No image provided" });
    }
    // Process image
    const processedImage = sharp(file.filepath);
    let metadata = await processedImage.metadata();

    // Resize if needed
    if (metadata.width > 4096 || metadata.height > 4096) {
      await processedImage.resize(4096, 4096, { fit: "inside" });
      metadata = await processedImage.metadata();
    }

    // Convert to JPEG buffer
    let outputBuffer = await processedImage.jpeg({ quality: 80 }).toBuffer();

    // Compress further if still too large
    if (outputBuffer.byteLength > 2 * 1024 * 1024) {
      outputBuffer = await sharp(outputBuffer).jpeg({ quality: 70 }).toBuffer();
    }

    // Final size validation
    const finalMetadata = await sharp(outputBuffer).metadata();
    if (finalMetadata.width < 200 || finalMetadata.height < 200) {
      return res.status(400).json({ error: "Face too small after resizing" });
    }

    // Prepare API request
    const formData = new FormData();

    // Create a readable stream from buffer
    const imageStream = Readable.from(outputBuffer);
    imageStream.on("error", (err) => {
      console.error("Stream error:", err);
      throw new Error("Image stream error");
    });

    formData.append("image_file", imageStream, {
      filename: `processed-${Date.now()}.jpg`,
      contentType: "image/jpeg",
      knownLength: outputBuffer.length, // Crucial for serverless
    });

    const apiUrl = new URL(
      "https://api-us.faceplusplus.com/facepp/v1/skinanalyze"
    );
    apiUrl.searchParams.append("api_key", apiKey);
    apiUrl.searchParams.append("api_secret", apiSecret);

    // Remove manual Content-Length header
    const response = await fetch(apiUrl.toString(), {
      method: "POST",
      body: formData,
      headers: formData.getHeaders(), // Let FormData handle headers
    });

    console.log("Face++ API response status:", Response.status);

    if (!Response.ok) {
      const errorData = await Response.json();
      console.error("Face++ API Error:", errorData);
      return res.status(Response.status).json({
        error: errorData.error_message || "Face++ API request failed",
      });
    }

    const result = await Response.json();
    console.log("Face++ API response data:", result);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Processing error:", error);
    return res.status(500).json({
      error: error.message || "Internal server error",
    });
  } finally {
    // Cleanup temporary files
    if (files?.file) {
      files.file.forEach((f) => {
        fs.unlink(f.filepath, (err) => {
          if (err) console.error("Cleanup error:", err);
        });
      });
    }
  }
}
