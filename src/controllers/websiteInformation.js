import WebsiteInformation from "../models/websiteInformation";

export const list = async (req, res) => {
  try {
    const website_information = await WebsiteInformation.getAllWebsiteInformation();
    res.json(website_information);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const showWebsiteInformationById = async (req, res) => {
  try {
    const website_information = await WebsiteInformation.getWebsiteInformationById(req.params.id);
    if (!website_information) {
      res.status(404).json({ error: "Website Information không tồn tại" });
    } else {
      res.json(website_information);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const create = async (req, res) => {
  try {
    const { logo, email, phone, address, fb, zalo } = req.body;
    const website_informationId = await WebsiteInformation.createWebsiteInformation(logo, email, phone, address, fb, zalo);
    res.json({ id: website_informationId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const update = async (req, res) => {
  try {
    const { id, logo, email, phone, address, fb, zalo } = req.body;
    await WebsiteInformation.updateWebsiteInformation(id, logo, email, phone, address, fb, zalo);
    res.json({ message: "WebsiteInformation updated thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteWebsiteInformation = async (req, res) => {
  try {
    await WebsiteInformation.deleteWebsiteInformation(req.params.id);
    res.json({ message: "Xóa Website Information thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
