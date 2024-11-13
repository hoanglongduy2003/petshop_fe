import { Router } from "express";
import { getAll, getById, add, update, remote } from "../controllers/message";
import { checkPermission } from "../middlewares/checkPermission";

const router = Router();

router.get("/message", getAll);
router.get("/message/:id", getById);
router.post("/message/", checkPermission, add);
router.put("/message/:id", checkPermission, update);
router.delete("/message/:id", checkPermission, remote);
export default router;
