import { Router } from "express";
import { create, list, deleteWebsiteInformation, showWebsiteInformationById, update } from "../controllers/websiteInformation";
import { checkPermission } from "../middlewares/checkPermission";

const router = Router();

router.get("/websiteInformation", list);
router.get("/websiteInformation/:id", showWebsiteInformationById);
router.post("/websiteInformation", checkPermission, create);
router.patch("/editWebsiteInformation", checkPermission, update);
router.delete("/websiteInformation/:id", checkPermission, deleteWebsiteInformation);
export default router;
