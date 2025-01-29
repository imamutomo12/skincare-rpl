const formidable = require("formidable");
const sharp = require("sharp");
const FormData = require("form-data");

export const config = {
  api: {
    bodyParser: false, // Disable default body parser
  },
};

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "Error in file processing" });
    }

    const file = files.file[0]; // Assuming the uploaded file is under the 'file' key

    if (!file) {
      return res.status(400).json({ error: "No image provided" });
    }

    try {
      // Read file buffer
      const buffer = await sharp(file.path).toBuffer();

      // Process image with sharp
      let processedImage = sharp(buffer).jpeg({ quality: 80 });

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
        resizedBuffer = await sharp(resizedBuffer)
          .jpeg({ quality: 70 })
          .toBuffer();
      }

      // Final validation
      const finalMetadata = await sharp(resizedBuffer).metadata();
      if (finalMetadata.width < 200 || finalMetadata.height < 200) {
        return res.status(400).json({ error: "Face too small after resizing" });
      }

      // Prepare API request
      const formData = new FormData();
      const apiKey = process.env.FACE_API_KEY;
      const apiSecret = process.env.FACE_API_SECRET;
      formData.append("api_key", apiKey);
      formData.append("api_secret", apiSecret);
      formData.append("image_file", resizedBuffer, {
        filename: "resized-image.jpg",
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

      return res.status(response.status).json(await response.json());
    } catch (error) {
      console.error("Error during image processing:", error);
      return res
        .status(500)
        .json({ error: error.message || "Processing failed" });
    }
  });
}
