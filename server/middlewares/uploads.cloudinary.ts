import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinaryConfig from '../configs/appConfigs';
import path from 'path';



export const middlewareUploads =async(folderName:string)=>{
    const storage = new CloudinaryStorage({
        cloudinary: cloudinaryConfig,
        params:(req, file)=>{
            const folderPath = `${folderName.trim()}`;
            const fileExtension = path.extname(file.originalname).substring(1);
            const publicId = `${folderPath}/${Date.now()}`;


            return{
                folder:folderPath,
                public_id:publicId,
                allowed_formats:['jpg','jpeg','png'],
                resource_type:'image',
                format: fileExtension,
            };
        },
    });

    return multer({
        storage:storage,
        fileFilter:(req, file, cb)=>{
            const fileExtension = path.extname(file.originalname).substring(1);
            if(fileExtension !== 'jpg' && fileExtension !== 'jpeg' && fileExtension !== 'png'){
                return cb(new Error('Only jpg, jpeg, and png files are allowed'));
            }
            cb(null, true);
        },
        limits:{
            fileSize: 1024 * 1024 * 2,
        },
    })
}