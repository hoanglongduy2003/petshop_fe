import Species from "../models/species";
import { speciesSchema } from "../schemas/species";

export const getAll = async (req, res) => {
  try {
    const listSpecies = await Species.getListSpecies();
    res.json(listSpecies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getById = async (req, res) => {
  try {
    const species = await Species.getIdSpecies(req.params.id);
    if (!species) {
      res.status(404).json({ error: "không tìm thấy" });
    } else {
      res.json(species);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const add = async (req, res) => {
  try {
    const { name } = req.body;
    const { error } = speciesSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const species = await Species.addSpecies(name);
    res.json({ id: species });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const { name } = req.body;
    const { error } = speciesSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    await Species.updateSpecies(req.params.id, name);
    res.json({ message: "Sửa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const remote = async (req, res) => {
  try {
    await Species.removeSpecies(req.params.id);
    res.json({ message: "Xóa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
