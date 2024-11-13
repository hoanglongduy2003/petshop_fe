import { Router } from "express";
import {
  list,
  showById,
  create,
  update,
  deletePe,
  updateIsDelete,
  checkPetHouse,
  listClient,
  postShowById,
} from "../controllers/pethouse";
import { checkPermission } from "../middlewares/checkPermission";
const router = Router();

router.get("/pethouse", checkPermission, list);
router.get("/petHouseClient", listClient);
router.get("/pethouse/:id", showById);
router.post("/petHousePost", postShowById);

router.post("/pethouse", checkPermission, create);
router.put("/pethouse/:id", checkPermission, update);
router.delete("/pethouse/:id", checkPermission, deletePe);
router.patch("/petHouse/block", checkPermission, updateIsDelete);
router.post("/checkPetHouse", checkPetHouse);

export default router;
