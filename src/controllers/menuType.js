import MenuType from "../models/menuType";

export const list = async (req, res) => {
  try {
    const menuType = await MenuType.getAllMenuType();
    res.json(menuType);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const showMenuTypeById = async (req, res) => {
  try {
    const menuType = await MenuType.getMenuTypeById(req.params.id);
    if (!menuType) {
      res.status(404).json({ error: "MenuType không tồn tại" });
    } else {
      res.json(menuType);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const create = async (req, res) => {
  try {
    const { name } = req.body;
    const menuTypeId = await MenuType.createMenuType(name);
    res.json({ id: menuTypeId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const update = async (req, res) => {
  try {
    const { id, name } = req.body;
    await MenuType.updateMenuType(id, name);
    res.json({ message: "MenuType updated thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteMenuType = async (req, res) => {
  try {
    await MenuType.deleteMenuType(req.params.id);
    res.json({ message: "Xóa MenuType thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
