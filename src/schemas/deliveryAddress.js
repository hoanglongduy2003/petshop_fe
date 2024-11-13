import joi from "joi";

export const deliveryAddressSchema = joi.object({
  id: joi.number(),
  name: joi.string().required().messages({
    "String.empty": "Tên không được để trống",
    "any.required": "Trường tên là bắt buộc",
  }),
  phone: joi.string().regex(/^0\d{9}$/).required().messages({
    "String.empty": "Số điện thoại không được để trống",
    "any.required": "Trường số điện thoại là bắt buộc",
    "string.pattern.base": "Số điện thoại phải bắt đầu bằng số 0 và có đúng 10 chữ số",
  }),
  address: joi.string().required().messages({
    "String.empty": "address không được để trống",
    "any.required": "Trường address là bắt buộc",
  }),
  city: joi.string().required().messages({
    "String.empty": "city không được để trống",
    "any.required": "Trường city là bắt buộc",
  }),
  district: joi.string().required().messages({
    "String.empty": "district không được để trống",
    "any.required": "Trường district là bắt buộc",
  }),
  ward: joi.string().required().messages({
    "String.empty": "ward không được để trống",
    "any.required": "Trường ward là bắt buộc",
  }),
  user_id: joi.number().required().messages({
    "String.empty": "user_id không được để trống",
    "any.required": "Trường user_id là bắt buộc",
  }),
});
