import StatusPet from "../models/status_pet";
import { statusPetSchema } from "../schemas/status_pet";

export const getAll = async (req, res) => {
  try {
    const listStatus = await StatusPet.getListStatusPet();
    res.json(listStatus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getById = async (req, res) => {
  try {
    const setStatus = await StatusPet.getIdStatusPet(req.params.id);
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
    const { error } = statusPetSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const setStatus = await StatusPet.addStatusPet(name);
    res.json({ id: setStatus });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const { name } = req.body;
    const { error } = statusPetSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    await StatusPet.updateStatusPet(req.params.id, name);
    res.json({ message: "Sửa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const remote = async (req, res) => {
  try {
    await StatusPet.removeStatusPet(req.params.id);
    res.json({ message: "Xóa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
