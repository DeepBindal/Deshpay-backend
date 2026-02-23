const multer = require("multer");
const path = require("path");
const fs = require("fs");

const bannerDir = path.join(__dirname, "../../uploads/banners");

if (!fs.existsSync(bannerDir)) {
  fs.mkdirSync(bannerDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, bannerDir),
  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `banner-${Date.now()}${ext}`;
    cb(null, name);
  },
});

const fileFilter = (_, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    cb(new Error("Only image files allowed"), false);
  } else {
    cb(null, true);
  }
};

module.exports = multer({ storage, fileFilter });
