const path = require("path");
const multer = require("multer");
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const file_types = /csv/;
    const mimetype = file_types.test(file.mimetype);

    const extname = file_types.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Files other than csv format is not accepted"));
  },
});

module.exports = upload;
