import express from "express";
import { getAll, getById, add, update, remote } from "../controllers/setTime";

import { checkPermission } from "./../middlewares/checkPermission";
const router = express.Router();

router.get("/settime", getAll);
router.get("/settime/:id", getById);
router.post("/settime", checkPermission, add);
router.put("/settime/:id", checkPermission, update);
router.delete("/settime/:id", checkPermission, remote);

export default router;
