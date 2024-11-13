import { Router } from "express";
import { create, list, deleteMenuType, showMenuTypeById, update } from "../controllers/menuType";
import { checkPermission } from "../middlewares/checkPermission";

const router = Router();

router.get("/menutype", list);
router.get("/menutype/:id", showMenuTypeById);
router.post("/menutype", checkPermission, create);
router.patch("/editMenuType", checkPermission, update);
router.delete("/menutype/:id", checkPermission, deleteMenuType);
export default router;
