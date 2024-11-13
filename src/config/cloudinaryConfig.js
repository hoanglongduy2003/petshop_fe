import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary"
cloudinary.config({
    cloud_name: "dksgvucji",
    api_key: "856617194432395",
    api_secret: "dwqcdwjXt7J-7hvU4KR5cnA89RI",
});

const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png'],
   params: {
    folder: 'duantotnghiep'
   }
})

const uploadCloud = multer({storage})
export default uploadCloud;
