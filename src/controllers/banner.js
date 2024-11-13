import Banner from "../models/banner";

export const list = async (req, res) => {
  try {
    const banner = await Banner.getAllBanner();
    res.json(banner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const showBannerById = async (req, res) => {
  try {
    const banner = await Banner.getBannerById(req.params.id);
    if (!banner) {
      res.status(404).json({ error: "Role không tồn tại" });
    } else {
      res.json(banner);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const create = async (req, res) => {
  try {
    const { img, title, slogan, link } = req.body;
    const bannerId = await Banner.createBanner(img, title, slogan, link);
    res.json({ id: bannerId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const update = async (req, res) => {
  try {
    const { id, img, title, slogan, link } = req.body;
    await Banner.updateBanner(id, img, title, slogan, link);
    res.json({ message: "Banner updated thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteBanner = async (req, res) => {
  try {
    await Banner.deleteBanner(req.params.id);
    res.json({ message: "Xóa Banner thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
