import {v2 as cloudinaryConfig} from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinaryConfig.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export async function handleUpload(file: string) {
    const res = await cloudinaryConfig.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}

export default cloudinaryConfig