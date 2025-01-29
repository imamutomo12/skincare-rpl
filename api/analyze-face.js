import formidable from "formidable";
import sharp from "sharp";
import FormData from "form-data";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // Disable default body parser
  },
};

export default async function handler(req, res) {
  console.log("Request received");
  const form = new formidable.IncomingForm({
    uploadDir: "/tmp", // Use Vercel's tmp directory for file uploads
    keepExtensions: true, // Keep file extensions
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parsing error:", err);
      return res.status(500).json({ error: "Error in file processing" });
    }
    console.log("Form parsed successfully");
    const file = files.file?.[0]; // Safely access the first file

    if (!file) {
      return res.status(400).json({ error: "No image provided" });
    }
    console.log("File uploaded:", file.originalFilename);
    try {
      // Read file buffer
      const buffer = await sharp(file.filepath).toBuffer();
      console.log("File read into buffer");
      // Process image with sharp
      let processedImage = sharp(buffer).jpeg({ quality: 80 });
      console.log("Image processed with sharp");
      // Get original metadata
      const metadata = await processedImage.metadata();
      let { width, height } = metadata;
      console.log("Image metadata:", metadata);
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
      console.log("Image resized");
      // Check file size (max 2MB)
      if (resizedBuffer.byteLength > 2 * 1024 * 1024) {
        console.log("Compressing image to reduce file size");
        resizedBuffer = await sharp(resizedBuffer)
          .jpeg({ quality: 70 })
          .toBuffer();
      }

      // Final validation
      const finalMetadata = await sharp(resizedBuffer).metadata();
      if (finalMetadata.width < 200 || finalMetadata.height < 200) {
        console.error("Face too small after resizing");
        return res.status(400).json({ error: "Face too small after resizing" });
      }

      // Prepare API request
      const formData = new FormData();
      const apiKey = process.env.FACE_API_KEY; // Ensure these are set in Vercel
      const apiSecret = process.env.FACE_API_SECRET;

      if (!apiKey || !apiSecret) {
        console.error("API credentials not configured");
        return res
          .status(500)
          .json({ error: "API credentials not configured" });
      }

      formData.append("api_key", apiKey);
      formData.append("api_secret", apiSecret);
      formData.append("image_file", resizedBuffer, {
        filename: "resized-image.jpg",
        contentType: "image/jpeg",
      });
      console.log("Prepared FormData for Face++ API");
      // Call Face++ API
      const response = await fetch(
        "https://api-us.faceplusplus.com/facepp/v1/skinanalyze",
        {
          method: "POST",
          body: formData,
          headers: formData.getHeaders(), // Add headers for FormData
        }
      );
      console.log("Face++ API response status:", response.status);
      // Handle Face++ API response
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Face++ API Error:", errorData);
        return res.status(response.status).json({
          error: errorData.error_message || "Face++ API request failed",
        });
      }

      const data = await response.json();
      console.log("Face++ API response data:", data);
      return res.status(200).json(data);
    } catch (error) {
      console.error("Error during image processing:", error);
      return res
        .status(500)
        .json({ error: error.message || "Processing failed" });
    } finally {
      // Clean up temporary file
      if (file?.filepath) {
        fs.unlink(file.filepath, (err) => {
          if (err) console.error("Error cleaning temp file:", err);
        });
      }
      console.log("Temporary file cleaned up");
    }
  });
}
