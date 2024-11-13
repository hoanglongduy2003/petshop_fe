import express from "express";
import {
  getAll,
  getById,
  add,
  update,
  remote,
} from "../controllers/status_pet";
import { checkPermission } from "../middlewares/checkPermission";

const router = express.Router();

router.get("/status_pet", getAll);
router.get("/status_pet/:id", getById);
router.post("/status_pet", checkPermission,add);
router.put("/status_pet/:id", checkPermission,update);
router.delete("/status_pet/:id", checkPermission,remote);

export default router;
