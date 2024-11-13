import StatusContact from "../models/status_contact";

import { statusContactSchema } from "../schemas/status_contact";

export const getAll = async (req, res) => {
  try {
    const listStatus = await StatusContact.getListStatusContact();
    res.json(listStatus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getById = async (req, res) => {
  try {
    const setStatus = await StatusContact.getIdStatusContact(req.params.id);
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
    const { error } = statusContactSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const setStatus = await StatusContact.addStatusContact(name);
    res.json({ id: setStatus });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const { name } = req.body;
    const { error } = statusContactSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    await StatusContact.updateStatusContact(req.params.id, name);
    res.json({ message: "Sửa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const remote = async (req, res) => {
  try {
    await StatusContact.removeStatusContact(req.params.id);
    res.json({ message: "Xóa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
