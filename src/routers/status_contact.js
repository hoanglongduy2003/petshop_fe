import express from "express";
import { getAll, getById, add, update, remote } from "../controllers/status_contact";

import { checkPermission } from "./../middlewares/checkPermission";
const router = express.Router();

router.get("/status_contact", getAll);
router.get("/status_contact/:id", getById);
router.post("/status_contact", checkPermission, add);
router.put("/status_contact/:id", checkPermission, update);
router.delete("/status_contact/:id", checkPermission, remote);

export default router;
