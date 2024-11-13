import Menu from "../models/menu";
import { menuSchema } from "../schemas/menu";

export const list = async (req, res) => {
    try {
        const menu = await Menu.getAllMenu();
        res.json(menu);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const listMenuMenuType = async (req, res) => {
    try {
        const menu = await Menu.getMenuMenuType();
        res.json(menu);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const show = async (req, res) => {
    try {
        const menuItem = await Menu.getMenuById(req.params.id);
        if (!menuItem) {
            res.status(404).json({ error: "Menu not found" });
        } else {
            res.json(menuItem);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const create = async (req, res) => {
    try {
        const { name, link, menuType_id } = req.body;
        const { error } = menuSchema.validate(req.body);
        if (error) {
            const errors = error.details.map((errorItem) => errorItem.message);
            return res.status(400).json({
                message: errors,
            });
        }
        const menuId = await Menu.createMenu(name, link, menuType_id);
        res.json({ id: menuId, message: "Gửi thành công rồi !" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const update = async (req, res) => {
    try {
        const { name, link, menuType_id } = req.body;
        const { error } = menuSchema.validate(req.body);
        if (error) {
            const errors = error.details.map((errorItem) => errorItem.message);
            return res.status(400).json({
                message: errors,
            });
        }
        await Menu.updateMenu(req.params.id, name, link, menuType_id);
        res.json({ message: "Menu updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const destroy = async (req, res) => {
    try {
        await Menu.deleteMenu(req.params.id);
        res.json({ message: "Menu deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
