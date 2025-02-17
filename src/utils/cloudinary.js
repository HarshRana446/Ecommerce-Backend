import fs from "fs"
import { response } from "express";
import { v2 as cloudinary } from 'cloudinary';

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async(localpath) => {
    try {

        if(!localpath) return null;
        else{
            const response = await cloudinary.uploader.upload(
                localpath, {
                    resource_type : "auto"
                }
            )
            console.log("File Uploaded succesfully!", response.url);
            fs.unlinkSync(localpath)
            return response
        }
    } catch (error) {
        fs.unlinkSync(localpath);
        return null;
    }
}

export {uploadOnCloudinary}