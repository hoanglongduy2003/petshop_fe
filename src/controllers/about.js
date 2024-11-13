import About from "../models/about";

import { aboutSchema } from "../schemas/about";

export const getAll = async (req, res) => {
  try {
    const listAbout = await About.getListAbout();
    res.json(listAbout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getById = async (req, res) => {
  try {
    const setAbout = await About.getIdAbout(req.params.id);
    if (!setAbout) {
      res.status(404).json({ error: "không tìm thấy" });
    } else {
      res.json(setAbout);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const add = async (req, res) => {
  try {
    const { image, description } = req.body;
    const { error } = aboutSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const setAbout = await About.addAbout(image, description);
    res.json({ id: setAbout, mesage: "Thêm about thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const { image, description } = req.body;
    const { error } = aboutSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    await About.updateAbout(req.params.id, image, description);
    res.json({ message: "Sửa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const remote = async (req, res) => {
  try {
    await About.removeAbout(req.params.id);
    res.json({ message: "Xóa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
