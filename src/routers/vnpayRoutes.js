import express from "express";
import {
  createPayment,
  handleVnPayCallback,
  handleVnPayReturnURL,
} from "../controllers/vnpayController";

const router = express.Router();

router.post("/create-payment", createPayment);
router.post("/callbackVNPAY", handleVnPayCallback);
router.get("/vnpay_return", handleVnPayReturnURL);

export default router;
