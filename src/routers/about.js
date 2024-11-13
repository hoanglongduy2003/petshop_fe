import { Router } from "express";
import { getAll, getById, add, update, remote } from "../controllers/about";
import { checkPermission } from "../middlewares/checkPermission";

const router = Router();

router.get("/about", getAll);
router.get("/about/:id", getById);
router.post("/about/", checkPermission, add);
router.put("/about/:id", checkPermission, update);
router.delete("/about/:id", checkPermission, remote);
export default router;
