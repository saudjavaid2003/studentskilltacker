import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/certs"); // save in uploads/certs folder
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);           // file extension
    const name = path.basename(file.originalname, ext);   // original name without extension
    cb(null, `${Date.now()}-${name}${ext}`);              // unique filename
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/jpg"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG/JPG images are allowed!"), false);
  }
};

// 3️⃣ Limits
const limits = {
  fileSize: 5 * 1024 * 1024 
};

// 4️⃣ Multer middleware for multiple files
export const uploadCertificates = multer({
  storage,
  fileFilter,
  limits
}).array("certificates", 10);
