import SetTime from "../models/setTime";

import { setTimeSchema } from "../schemas/setTime";

export const getAll = async (req, res) => {
  try {
    const listSetTime = await SetTime.getListSetTime();
    res.json(listSetTime);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getById = async (req, res) => {
  try {
    const setSetTime = await SetTime.getIdSetTime(req.params.id);
    if (!setSetTime) {
      res.status(404).json({ error: "không tìm thấy" });
    } else {
      res.json(setSetTime);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const add = async (req, res) => {
  try {
    const { name, start_time, end_time } = req.body;
    const { error } = setTimeSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const setSetTime = await SetTime.addSetTime(name, start_time, end_time);
    res.json({ id: setSetTime });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const { name, start_time, end_time } = req.body;
    const { error } = setTimeSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    await SetTime.updateSetTime(req.params.id, name, start_time, end_time);
    res.json({ message: "Sửa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const remote = async (req, res) => {
  try {
    await SetTime.removeSetTime(req.params.id);
    res.json({ message: "Xóa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
