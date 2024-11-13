import { Router } from "express";
import {
  getIDlistCarts,
  createCarts,
  updateQuantityCarts,
  deleteAllCarts,
  deleteIDCarts,
} from "../controllers/carts";

const router = Router();

router.get("/getUserListCarts", getIDlistCarts);
router.post("/addCarts", createCarts);
router.patch("/updateCarts/:id", updateQuantityCarts);
router.delete("/deleteAllCarts", deleteAllCarts);
router.delete("/deleteIDCarts/:cartId", deleteIDCarts);

export default router;
