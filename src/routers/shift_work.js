import express from "express";
import { getAll, getById, add, update, remote } from "../controllers/shift_work";

import { checkPermission } from "./../middlewares/checkPermission";
const router = express.Router();

router.get("/shiftwork", getAll);
router.get("/shiftwork/:id", getById);
router.post("/shiftwork", checkPermission, add);
router.put("/shiftwork/:id", checkPermission, update);
router.delete("/shiftwork/:id", checkPermission, remote);

export default router;
