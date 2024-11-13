import express from "express";
import { deleteImage, uploadImage } from "../controllers/upload";
import uploadCloud from "../controllers/uploader"

const router = express.Router();

router.post("/images/upload", uploadCloud.single('image'), uploadImage);
router.delete("/images/delete", deleteImage);

export default router;
