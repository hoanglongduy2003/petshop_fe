import PaymentMethods from "../models/paymentMethods";


export const getAll = async (req, res) => {
  try {
    const paymentMethods = await PaymentMethods.getAllPaymentMethods();
    res.json(paymentMethods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

