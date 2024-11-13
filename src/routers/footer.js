import { Router } from "express";
import { create, list, deleteFooter, showFooterById, update } from "../controllers/footer";
import { checkPermission } from "../middlewares/checkPermission";

const router = Router();

router.get("/footer", list);
router.get("/footer/:id", showFooterById);
router.post("/footer", checkPermission, create);
router.patch("/editFooter", checkPermission, update);
router.delete("/footer/:id", checkPermission, deleteFooter);
export default router;
