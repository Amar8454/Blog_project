import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const cloudeUploadImage = async (localFilePath, folder) => {
  try {
    if (!localFilePath) return null;
    const uploadImage = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: folder,
    });

    // delete after uploaded
    fs.unlinkSync(localFilePath);
    return uploadImage;
    
  } catch (error) {
    // for remove file if not upload
    if (localFilePath) {
      fs.unlinkSync(localFilePath);
    }
    throw error;
  }
};
