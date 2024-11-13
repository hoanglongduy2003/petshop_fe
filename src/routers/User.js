import express from "express";

import { checkPermission } from "./../middlewares/checkPermission";
import {
  getById,
  getUser,
  list,
  listStaff,
  listUsersRole,
  searchUser,
  updateIsDelete,
  updatePassword,
  updateRole,
  updateUser,
} from "../controllers/user";
import { resetPassword } from "../controllers/auth";
const router = express.Router();

router.get("/getAllUser", list);
router.get("/getAllUserRole", listUsersRole);
router.get("/getById/:id", getById);
router.put("/updateRole", updateRole);
router.post("/password/reset", resetPassword);
router.patch("/user/block", checkPermission, updateIsDelete);
router.patch("/user/role", checkPermission, updateRole);
router.get("/getUser", getUser);
router.patch("/user/updatePassword", updatePassword);
router.put("/updateUser/:id", updateUser);
router.get("/Search", searchUser);
router.get("/getAllStaff" , listStaff)

export default router;
