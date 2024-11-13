import Breed from "../models/breed";
import { breedSchema } from "../schemas/breed";

export const listBreed = async (req, res) => {
  try {
    const breeds = await Breed.getAllBreeds();
    res.json(breeds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const listBreedsSpecies = async (req, res) => {
  try {
    const breeds = await Breed.getBreedsSpecies(req.params.id);
    res.json(breeds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const showBreed = async (req, res) => {
  try {
    const breed = await Breed.getBreedById(req.params.id);
    if (!breed) {
      res.status(404).json({ error: "Không tìm thấy giống thú cưng" });
    } else {
      res.json(breed);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const createBreed = async (req, res) => {
  try {
    const { name, species_id } = req.body;
    const { error } = breedSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const BreedId = await Breed.addBreed(name, species_id);
    res.json({ id: BreedId, message: "thêm giống thú cưng thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const updateBreed = async (req, res) => {
  try {
    const { name, species_id } = req.body;
    const { error } = breedSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    await Breed.updateBreed(req.params.id, name, species_id);
    res.json({ message: "Cập nhập giống thú cưng thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteBreed = async (req, res) => {
  try {
    await Breed.deleteBreed(req.params.id);
    res.json({ message: "Xóa giống thú cưng thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
