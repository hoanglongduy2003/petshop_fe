import { Router } from "express";
import {
  getCountUserDay,
  getRevenueThisMonth,
  getRevenueToday,
  list,
  sCheduleStatusOrder,
  total,
  totalRevenue
} from "../controllers/dashboard";
import { checkPermission } from "../middlewares/checkPermission";
const router = Router();

router.get("/dashboard", checkPermission, list);
router.get("/dashboardTotal", checkPermission, total);
router.get("/totalRevenue", totalRevenue);
router.get("/getRevenueToday", getRevenueToday);
router.get("/getRevenueThisMonth", getRevenueThisMonth);
router.get("/getCountUserDay", getCountUserDay);
router.get("/sCheduleStatusOrder", sCheduleStatusOrder);

export default router;
