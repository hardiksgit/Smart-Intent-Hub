const s3_service = require("../services/s3_service.js");
const { validate_file } = require("../utils/file_validator.js");

exports.upload_file = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file given" });
    }

    const is_valid = await validate_file(req.file.buffer);

    if (!is_valid) {
      return res.status(400).json({ error: "Invalid file" });
    }

    const upload_result = await s3_service.s3_upload(req.file);

    res.status(200).json({
      message: "File uploaded successfully",
      data: upload_result.Location,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
};
