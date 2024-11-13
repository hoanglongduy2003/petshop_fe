import Footer from "../models/footer";

export const list = async (req, res) => {
  try {
    const footer = await Footer.getAllFooter();
    res.json(footer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const showFooterById = async (req, res) => {
  try {
    const footer = await Footer.getFooterById(req.params.id);
    if (!footer) {
      res.status(404).json({ error: "Role không tồn tại" });
    } else {
      res.json(footer);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const create = async (req, res) => {
  try {
    const { slogan, content_left, content_right, license } = req.body;
    const footerId = await Footer.createFooter(slogan, content_left, content_right, license);
    res.json({ id: footerId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const update = async (req, res) => {
  try {
    const { id, slogan, content_left, content_right, license } = req.body;
    await Footer.updateFooter(id, slogan, content_left, content_right, license);
    res.json({ message: "Footer updated thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteFooter = async (req, res) => {
  try {
    await Footer.deleteFooter(req.params.id);
    res.json({ message: "Xóa Footer thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
