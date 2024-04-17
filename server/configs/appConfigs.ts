import { v2 as cloudinaryConfig, ConfigOptions } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const configOptions: ConfigOptions = {
    cloud_name: process.env.CLOUD_NAME as string,
    api_key: process.env.CLOUDINARY_API_KEY as string,
    api_secret: process.env.CLOUDINARY_API_SECRET as string,
};

cloudinaryConfig.config(configOptions);

export default cloudinaryConfig;
