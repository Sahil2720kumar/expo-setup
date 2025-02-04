import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath: string) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
    });
    //file has been uploaded successfully
    console.log("file log", response.url);
    fs.unlinkSync(localFilePath);
    return response.secure_url;
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove the locally saved temporary file as the uplaod operation got failed

    return null;
  }
};

export { uploadOnCloudinary };
