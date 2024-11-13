import { Router } from "express";
import { list, show, create, update, destroy, listContactUser, updateStatus } from "../controllers/contact";
import { checkPermission } from "../middlewares/checkPermission";
const router = Router();

router.get("/contact", list);
router.get("/getContactUser", listContactUser);
router.get("/contact/:id", show);
router.post("/contact", create);
router.patch("/contact/:id", checkPermission, update);
router.delete("/contact/:id", checkPermission, destroy);
router.put("/updateStatus", checkPermission, updateStatus);

export default router;
