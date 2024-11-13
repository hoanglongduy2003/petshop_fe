import News from "../models/news";
import { newsSchema } from "../schemas/news";

export const list = async (req, res) => {
  try {
    const list = await News.getListNews();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const listTop3 = async (req, res) => {
  try {
    const list = await News.getListNewsTop3();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const listTop8 = async (req, res) => {
  try {
    const list = await News.getTop8();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const listNewsUsers = async (req, res) => {
  try {
    const news = await News.getNewsUsers();
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const show = async (req, res) => {
  try {
    const news = await News.getNews(req.params.id);
    if (!news) {
      res.status(404).json({ error: "không tìm thấy news" });
    } else {
      res.json(news);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const create = async (req, res) => {
  try {
    const { img, title, description, created_at, user_id } = req.body;
    const { error } = newsSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const set = await News.createNews(
      img,
      title,
      description,
      created_at,
      user_id
    );
    res.json({ id: set });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const update = async (req, res) => {
  try {
    const { img, title, description, created_at, user_id } = req.body;
    const { error } = newsSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    await News.updateNews(
      req.params.id,
      img,
      title,
      description,
      created_at,
      user_id
    );
    res.json({ message: "sửa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const remote = async (req, res) => {
  try {
    await News.deleteNews(req.params.id);
    res.json({ message: "xóa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
