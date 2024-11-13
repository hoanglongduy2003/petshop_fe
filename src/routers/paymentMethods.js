import { Router } from "express";
import { getAll } from "../controllers/paymentMethods";
const router = Router();

router.get("/paymentMethods", getAll);

export default router;
