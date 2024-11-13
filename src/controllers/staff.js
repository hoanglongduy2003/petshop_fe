import Staff from "../models/staff";

import { staffSchema } from "../schemas/staff";

export const getAll = async (req, res) => {
  try {
    const listStaff = await Staff.getListStaff();
    res.json(listStaff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getById = async (req, res) => {
  try {
    const setStaff = await Staff.getIdStaff(req.params.id);
    if (!setStaff) {
      res.status(404).json({ error: "không tìm thấy" });
    } else {
      res.json(setStaff);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const add = async (req, res) => {
  try {
    const { name } = req.body;
    const { error } = staffSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const setStaff = await Staff.addStaff(name);
    res.json({ id: setStaff });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const { name } = req.body;
    const { error } = staffSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    await Staff.updateStaff(req.params.id, name);
    res.json({ message: "Sửa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const remote = async (req, res) => {
  try {
    await Staff.removeStaff(req.params.id);
    res.json({ message: "Xóa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
