import jwt from "jsonwebtoken";
import Pet from "../models/pet";
import User from "../models/user";
import { petSchema } from "../schemas/pet";

export const listPet = async (req, res) => {
  try {
    const pets = await Pet.getAllPet();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const listUserPet = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("Bạn chưa đăng nhập");
    }
    const decoded = jwt.verify(token, "duantotnghiep");
    const user = await User.getUser(decoded.id);
    if (!user) {
      res.status(404).json({ error: "" });
    } else {
      try {
        const pets = await Pet.getAllUserPet(user.id);
        res.json(pets);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  } catch (error) {
    return res.status(401).json({
      message: "Token không hợp lệ",
    });
  }
};
export const listPetByUserId = async (req, res) => {
  const { id } = req.body;
  try {
    const pets = await Pet.getAllUserPet(id);
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const showPet = async (req, res) => {
  try {
    const pet = await Pet.getPetById(req.params.id);
    if (!pet) {
      res.status(404).json({ error: "Không tìm thấy thú cưng" });
    } else {
      res.json(pet);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const createPet = async (req, res) => {
  try {
    const {
      img,
      name,
      age,
      gender,
      user_id,
      species_id,
      breed_id,
      health_condition,
    } = req.body;
    const { error } = petSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const pet = await Pet.addPet(
      img,
      name,
      age,
      gender,
      user_id,
      species_id,
      breed_id,
      health_condition
    );
    const petData = await Pet.getPetById(pet.insertId);
    res.json({
      data: petData,
      message: "thêm thông tin thú cưng thành công",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const updatePet = async (req, res) => {
  try {
    const {
      img,
      name,
      age,
      gender,
      user_id,
      species_id,
      breed_id,
      status_id,
      health_condition,
    } = req.body;
    const { error } = petSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const updatedHealthCondition = health_condition || "";
    await Pet.updatePet(
      req.params.id,
      img,
      name,
      age,
      gender,
      user_id,
      species_id,
      breed_id,
      status_id,
      updatedHealthCondition
    );
    res.json({ message: "Cập nhập thông tin thú cưng thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePet = async (req, res) => {
  try {
    await Pet.deletePet(req.params.id);
    res.json({ message: "Xóa thông tin thú cưng thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const userPet = async (req, res) => {
  try {
    const { data } = req.body;
    const petPromises = data.map(async (item) => {
      return Pet.getUserPet(item.pet_id);
    });
    const pets = await Promise.all(petPromises);
    const notFoundPets = pets.filter((pet) => !pet);
    if (notFoundPets.length > 0) {
      res.status(404).json({ error: "Không tìm thấy thú cưng" });
    } else {
      res.json(pets);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
