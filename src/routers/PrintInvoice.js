import express from "express";

import { getIDInvoices, createInvoice } from "../controllers/PrintInvoice";

const router = express.Router();

router.get("/invoices/:id", getIDInvoices);
router.post("/createInvoice", createInvoice);

export default router;
