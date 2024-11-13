import Pethouse from "../models/pethouse";
import { pethouseSchema } from "../schemas/pethouse";

export const list = async (req, res) => {
  try {
    const pethouse = await Pethouse.getAllPetHouse();
    res.json(pethouse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const listClient = async (req, res) => {
  try {
    const pethouse = await Pethouse.getAllPetHouseClient();
    res.json(pethouse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const showById = async (req, res) => {
  try {
    const pethouse = await Pethouse.getPethouseById(req.params.id);
    if (!pethouse) {
      res.status(404).json({ error: "Pethouse không tồn tại" });
    } else {
      res.json(pethouse);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const postShowById = async (req, res) => {
  try {
    const pethouse = await Pethouse.getPethouseById(req.body.id);
    if (!pethouse) {
      res.status(404).json({ error: "Pethouse không tồn tại" });
    } else {
      res.json(pethouse);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
export const create = async (req, res) => {
  try {
    const { name } = req.body;
    const { error } = pethouseSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const pethouseId = await Pethouse.createPethouse(name);
    res.json({ id: pethouseId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const { name } = req.body;
    const { error } = pethouseSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const existingPethouse = await Pethouse.getPethouseById(req.params.id);
    if (!existingPethouse) {
      return res.status(404).json({ error: "Pethouse không tồn tại" });
    }
    await Pethouse.updatePethouse(req.params.id, name);
    res.json({ message: "Cập nhập thông tin pethouse thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePe = async (req, res) => {
  try {
    const pethouse = await Pethouse.getPethouseById(req.params.id);

    if (!pethouse) {
      return res.status(404).json({ message: "Không có gì để xóa" });
    }

    await Pethouse.deletePethouse(req.params.id);
    res.json({ message: "pethouse xóa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateIsDelete = async (req, res) => {
  try {
    const { id, is_delete } = req.body;
    await Pethouse.updateBlockPetHouse(id, is_delete);
    res.json({ message: "Khóa phòng thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const checkPetHouse = async (req, res) => {
  try {
    const { id } = req.body;
    const pethouse = await Pethouse.checkPethouse(id);
    res.status(200).json(pethouse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
