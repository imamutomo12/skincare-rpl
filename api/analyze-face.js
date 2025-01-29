import { formidable } from "formidable";
import sharp from "sharp";
import FormData from "form-data";
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
    // Verify environment variables
    const apiKey = process.env.FACE_API_KEY;
    const apiSecret = process.env.FACE_API_SECRET;
    if (!apiKey || !apiSecret) {
      throw new Error("API credentials not configured");
    }

    // Parse form
    const form = formidable({
      uploadDir: "/tmp",
      keepExtensions: true,
      multiples: false,
    });

    // Parse form data
    const [fields, parsedFiles] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        err ? reject(err) : resolve([fields, files]);
      });
    });
    files = parsedFiles;

    // Validate file
    const file = files.file?.[0];
    if (!file || !fs.existsSync(file.filepath)) {
      return res.status(400).json({ error: "Invalid file upload" });
    }

    // Process image
    let imageBuffer = await sharp(file.filepath)
      .resize({
        width: 4096,
        height: 4096,
        fit: "inside",
        withoutEnlargement: true,
      })
      .jpeg({
        quality: 80,
        mozjpeg: true,
      })
      .toBuffer();

    // Validate final size
    const metadata = await sharp(imageBuffer).metadata();
    if (metadata.width < 200 || metadata.height < 200) {
      return res.status(400).json({ error: "Image dimensions too small" });
    }

    // Prepare API request
    const formData = new FormData();

    // Critical fix: Append buffer directly instead of stream
    formData.append("image_file", imageBuffer, {
      filename: `upload-${Date.now()}.jpg`,
      contentType: "image/jpeg",
      knownLength: imageBuffer.length,
    });

    // Create API URL with credentials
    const apiUrl = new URL(
      "https://api-us.faceplusplus.com/facepp/v1/skinanalyze"
    );
    apiUrl.searchParams.append("api_key", apiKey);
    apiUrl.searchParams.append("api_secret", apiSecret);

    // Before fetch call
    console.log("FormData Headers:", formData.getHeaders());
    console.log("Image Buffer Size:", imageBuffer.length);

    // Send request
    const response = await fetch(apiUrl.toString(), {
      method: "POST",
      body: formData,
      headers: formData.getHeaders(),
    });

    // Handle response
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
    // Cleanup files
    if (files?.file) {
      files.file.forEach((f) => {
        if (fs.existsSync(f.filepath)) {
          fs.unlinkSync(f.filepath); // Use sync method for serverless
        }
      });
    }
  }
}
