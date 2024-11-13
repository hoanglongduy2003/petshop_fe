import Status from "../models/status_appointment";
import StatusPayment from "../models/status_payment";
import { statusSchema } from "../schemas/status_appointment";

export const getAll = async (req, res) => {
  try {
    const listStatus = await Status.getListStatus();
    res.json(listStatus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getById = async (req, res) => {
  try {
    const setStatus = await Status.getIdStatus(req.params.id);
    if (!setStatus) {
      res.status(404).json({ error: "không tìm thấy" });
    } else {
      res.json(setStatus);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const add = async (req, res) => {
  try {
    const { name } = req.body;
    const { error } = statusSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const setStatus = await Status.addStatus(name);
    res.json({ id: setStatus });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const { name } = req.body;
    const { error } = statusSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    await Status.updateStatus(req.params.id, name);
    res.json({ message: "Sửa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const remote = async (req, res) => {
  try {
    await Status.removeStatus(req.params.id);
    res.json({ message: "Xóa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllStatusPayment = async (req, res) => {
  try {
    const listStatus = await StatusPayment.getAllStatusPayment();
    res.json(listStatus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
