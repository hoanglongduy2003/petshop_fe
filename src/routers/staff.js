import express from "express";
import { getAll, getById, add, update, remote } from "../controllers/staff";

import { checkPermission } from "./../middlewares/checkPermission";
const router = express.Router();

router.get("/staff", getAll);
router.get("/staff/:id", getById);
router.post("/staff/", checkPermission, add);
router.put("/staff/:id", checkPermission, update);
router.delete("/staff/:id", checkPermission, remote);

export default router;
