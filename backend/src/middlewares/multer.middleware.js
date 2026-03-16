import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "profileImage") {
      cb(null, "public/profile");
    } else if (file.fieldname === "postImage") {
      cb(null, "public/temp");
    } else if (file.fieldname === "authorProfile") {
      cb(null, "public/author");
    } else {
      cb(new Error("Invalid file field"));
    }
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});
