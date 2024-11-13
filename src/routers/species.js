import express from "express";
import { getAll, getById, add, update, remote } from "../controllers/species";

import { checkPermission } from "./../middlewares/checkPermission";
const router = express.Router();

router.get("/species", getAll);
router.get("/species/:id", getById);
router.post("/species/", checkPermission, add);
router.put("/species/:id", checkPermission, update);
router.delete("/species/:id", checkPermission, remote);

export default router;
