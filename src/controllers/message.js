import Message from "../models/message";

import { messageSchema } from "../schemas/message";

export const getAll = async (req, res) => {
  try {
    const listMessage = await Message.getListMessage();
    res.json(listMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getById = async (req, res) => {
  try {
    const setMessage = await Message.getIdMessage(req.params.id);
    if (!setMessage) {
      res.status(404).json({ error: "không tìm thấy" });
    } else {
      res.json(setMessage);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const add = async (req, res) => {
  try {
    const { text } = req.body;
    const { error } = messageSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const setMessage = await Message.addMessage(text);
    res.json({ id: setMessage, mesage: "Thêm massage thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const { text } = req.body;
    const { error } = messageSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    await Message.updateMessage(req.params.id, text);
    res.json({ message: "Sửa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const remote = async (req, res) => {
  try {
    await Message.removeMessage(req.params.id);
    res.json({ message: "Xóa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
