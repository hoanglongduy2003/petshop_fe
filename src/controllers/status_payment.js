import StatusPayment from "../models/status_payment";

export const getAll = async (req, res) => {
  try {
    const listStatus = await StatusPayment.getAllStatusPayment();
    res.json(listStatus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};