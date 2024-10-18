const express = require("express");
const upload_controller = require("../controllers/upload_controller.js");

const router = express.Router();

router.post("/upload", upload_controller.upload_file);
module.exports = router;
