import formidable from "formidable";
import sharp from "sharp";
import FormData from "form-data";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  // Configure formidable to use Vercel's tmp directory
  const form = new formidable.IncomingForm({
    uploadDir: "/tmp",
    keepExtensions: true,
  });

  try {
    // Wrap form.parse in a promise
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    // Handle file extraction correctly
    let file = files.file;
    if (Array.isArray(file)) {
      file = file[0]; // Take first file if array
    }

    if (!file) {
      return res.status(400).json({ error: "No image provided" });
    }

    try {
      // Process image
      const buffer = await sharp(file.filepath).toBuffer();

      // ... rest of your image processing logic ...

      // Call Face++ API
      const faceppResponse = await fetch(
        "https://api-us.faceplusplus.com/facepp/v1/skinanalyze",
        {
          method: "POST",
          body: formData,
        }
      );

      // Handle Face++ response
      const data = await faceppResponse.json();
      return res.status(faceppResponse.status).json(data);
    } catch (error) {
      console.error("Processing error:", error);
      return res
        .status(500)
        .json({ error: error.message || "Image processing failed" });
    }
  } catch (error) {
    console.error("Form parsing error:", error);
    return res.status(500).json({ error: "Error processing form data" });
  }
}
