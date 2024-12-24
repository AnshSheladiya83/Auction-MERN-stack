// multerHelper.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set the destination folder path
const uploadDir = "uploads/";

// Check if the 'uploads' directory exists, if not, create it
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Create directory with subdirectories if needed
}

// Set the storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder for file uploads
    cb(null, uploadDir); // Use the 'uploads/' folder
  },
  filename: function (req, file, cb) {
    // Generate a unique filename with the original extension
    cb(
      null,
      `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(
        file.originalname
      )}`
    );
  },
});

// Set up file filter to accept only image files (JPG, PNG, GIF)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only image files are allowed"), false); // Reject the file
  }
};

// Set up multer with storage, file filter, and limits
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // Max file size 5MB
  },
});

module.exports = upload;
    