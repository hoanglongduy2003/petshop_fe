import { Router } from "express";
import cron from "node-cron";

import {
  cancelHistoryAppointment,
  create,
  createAdmin,
  getAppointmentTime,
  getAppointmentUser,
  getAppointmentUserStatus,
  list,
  listAppointmentData,
  searchAppointmentsAdmin,
  show,
  status_payment,
  update,
  updateAdmin,
  updateAppointmentStatus,
  updateStatusCancelAppointment,
  listPaymentAppointment,
  getPrintData,
  checkPetHouse,
  updateAppointmentPayment,
} from "../controllers/appointments";
import { checkPermission } from "../middlewares/checkPermission";

const router = Router();

router.get("/appointments", list);
router.get("/appointment/:id", show);
router.get("/appointment/:id/status_payment", status_payment);
router.get("/getAllAppointmentData", listAppointmentData);
router.get("/getAppointmentUser", getAppointmentUser);
router.get("/getAppointmentUserStatus/:status_id", getAppointmentUserStatus);
router.post("/searchAppointmentsAdmin", searchAppointmentsAdmin);
router.post("/checkPetHouseAppointments", checkPetHouse);

router.patch("/updateAdmin/:id", checkPermission, updateAdmin);
router.post("/appointment", create);

router.post("/appointmentAdmin", checkPermission, createAdmin);

router.patch("/appointment/:id", update);
router.put("/appointmentStatus/:id", updateAppointmentStatus);
router.put("/appointmentPayment/:id", updateAppointmentPayment);
router.post("/appointmentTime", getAppointmentTime);
router.patch("/cancelHistoryAppointment", cancelHistoryAppointment);
router.get("/updateStatusCancelAppointment", updateStatusCancelAppointment);
router.get("/appointmentListPayment/:id", listPaymentAppointment);
router.get("/appointmentPrintData/:id", getPrintData);
cron.schedule("*/1 * * * *", async () => {
  console.log("cron job success");
  await updateStatusCancelAppointment();
});
export default router;
