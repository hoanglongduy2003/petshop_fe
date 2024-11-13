import { Router } from "express";
import {
  list,
  showById,
  create,
  update,
  updateIsDelete,
  getTop4Services,
  listClient,
  checkServices,
  getTop1Services,
} from "../controllers/services";
import { checkPermission } from "../middlewares/checkPermission";
const router = Router();

router.get("/services", checkPermission, list);
router.get("/servicesClient", listClient);
router.get("/services/:id", showById);
router.post("/services", checkPermission, create);
router.post("/checkServices", checkServices);
router.put("/services/:id", checkPermission, update);
router.patch("/services/block", checkPermission, updateIsDelete);
router.get("/servicesTop4", getTop4Services);
router.get("/servicesTop1", getTop1Services);

export default router;
