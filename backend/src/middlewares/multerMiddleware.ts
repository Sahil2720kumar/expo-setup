import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads"); // Save files here
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true); // Accept the file
    } else {
       // @ts-ignore
      cb(new Error("Only image files are allowed!"), false); // Reject
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

export { upload };
