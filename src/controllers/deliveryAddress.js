import DeliveryAddress from "../models/deliveryAddress";
import { deliveryAddressSchema } from "../schemas/deliveryAddress";

export const getDeliveryAddressUser = async (req, res) => {
  try {
    const deliveryAddress = await DeliveryAddress.getAllDeliveryAddress(
      req.params.id
    );
    res.json(deliveryAddress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createDeliveryAddress = async (req, res) => {
  try {
    const { name, phone, address, city, district, ward, user_id } = req.body;
    const { error } = deliveryAddressSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const contactsId = await DeliveryAddress.createDeliveryAddress(
      name,
      phone,
      address,
      city,
      district,
      ward,
      user_id
    );
    res.json({ id: contactsId, message: "Tạo địa chỉ thành công!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const updateDeliveryAddress = async (req, res) => {
  try {
    const { name, phone, address, city, district, ward, user_id } = req.body;
    const { error } = deliveryAddressSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    await DeliveryAddress.updateDeliveryAddress(
      req.params.id,
      name,
      phone,
      address,
      city,
      district,
      ward,
      user_id
    );
    res.json({ message: "Cập nhật địa chỉ thành công!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const deleteDeliveryAddress = async (req, res) => {
  try {
    await DeliveryAddress.deleteDeliveryAddress(req.params.id);
    res.json({ message: "Xóa địa chỉ thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
