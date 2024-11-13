import { Router } from "express";
import { create, list, deleteBanner, showBannerById, update } from "../controllers/banner";
import { checkPermission } from "../middlewares/checkPermission";

const router = Router();

router.get("/banner", list);
router.get("/banner/:id", showBannerById);
router.post("/banner", checkPermission, create);
router.patch("/editBanner", checkPermission, update);
router.delete("/banner/:id", checkPermission, deleteBanner);
export default router;
