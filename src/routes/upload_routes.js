const express = require("express");
const upload_controller = require("../controllers/upload_controller.js");
const upload = require("../middleware/file_upload.js");

const router = express.Router();

router.post("/upload", upload.single("file"), upload_controller.upload_file);

module.exports = router;
