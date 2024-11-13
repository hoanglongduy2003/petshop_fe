import { Router } from "express";
import { createDeliveryAddress, deleteDeliveryAddress, getDeliveryAddressUser, updateDeliveryAddress } from "../controllers/deliveryAddress";
const router = Router();

router.get("/deliveryAddressUser/:id", getDeliveryAddressUser);
router.post("/deliveryAddress", createDeliveryAddress);
router.put("/deliveryAddress/:id", updateDeliveryAddress);
router.delete("/deliveryAddress/:id", deleteDeliveryAddress);

export default router;
