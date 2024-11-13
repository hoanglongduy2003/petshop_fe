import joi from "joi";

export const orderSchema = joi.object({
  id: joi.number(),
  cart_id: joi.number(),
  products: joi.array(),
  user_id: joi.number().required().messages({
    "String.empty": "user_id không được để trống",
    "any.required": "Trường user_id là bắt buộc",
  }),
  total: joi.number().required().messages({
    "String.empty": "totalOrders không được để trống",
    "any.required": "Trường totalOrders là bắt buộc",
  }),
  contact_information: joi.string().required().messages({
    "String.empty": "contact_information không được để trống",
    "any.required": "Trường contact_information là bắt buộc",
  }),
  time: joi.string(),
  note: joi.string().required().messages({
    "String.empty": "note không được để trống",
    "any.required": "Trường note là bắt buộc",
  }),
  status_id: joi.number(),
});
