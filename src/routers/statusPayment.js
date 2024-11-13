import { Router } from "express";
import { getAll } from "../controllers/status_payment";


const router = Router();

router.get("/statusPayment", getAll);
export default router;
