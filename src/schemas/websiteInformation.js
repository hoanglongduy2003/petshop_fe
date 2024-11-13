import joi from "joi";

export const websiteInformationSchema = joi.object({
  id: joi.number(),
  logo: joi.string().messages({
    "string.empty": "Logo không được để trống",
  }),
  email: joi.string().required().messages({
    "string.empty": "Email không được để trống",
    "any.required": "Trường email là bắt buộc",
    "string.email": "Email không đúng định dạng",
  }),
  phone: joi.number().required().messages({
    "String.empty": "Số điện thoại không được để trống",
    "any.required": "Trường số điện thoại là bắt buộc",
  }),
  address: joi.string().required().messages({
    "String.empty": "Địa chỉ không được để trống",
    "any.required": "Địa chỉ là trường bắt buộc",
  }),
  fb: joi.string().required().messages({
    "String.empty": "Link facebook không được để trống",
    "any.required": "Link facebook là trường bắt buộc",
  }),
  zalo: joi.string().required().messages({
    "String.empty": "Link zalo không được để trống",
    "any.required": "Link zalo là trường bắt buộc",
  }),
});
