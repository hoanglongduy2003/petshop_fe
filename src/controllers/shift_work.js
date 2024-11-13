import { shiftWorkSchema } from "../schemas/shift_work";
import ShiftWork from './../models/shift_work';

export const getAll = async (req, res) => {
  try {
    const listShiftWork = await ShiftWork.getListShiftWork();
    res.json(listShiftWork);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getById = async (req, res) => {
  try {
    const setShiftWork = await ShiftWork.getIdShiftWork(req.params.id);
    if (!setShiftWork) {
      res.status(404).json({ error: "không tìm thấy" });
    } else {
      res.json(setShiftWork);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const add = async (req, res) => {
  try {
    const { name, start_time, end_time } = req.body;
    const { error } = shiftWorkSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const setShiftWork = await ShiftWork.addShiftWork(name, start_time, end_time);
    res.json({ id: setShiftWork });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const { name, start_time, end_time } = req.body;
    const { error } = shiftWorkSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    await ShiftWork.updateShiftWork(req.params.id, name, start_time, end_time);
    res.json({ message: "Sửa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const remote = async (req, res) => {
  try {
    await ShiftWork.removeShiftWork(req.params.id);
    res.json({ message: "Xóa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
