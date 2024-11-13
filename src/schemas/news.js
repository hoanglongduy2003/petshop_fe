import joi from "joi";

export const newsSchema = joi.object({
  id: joi.number(),
  img: joi.string().messages({
    "string.empty": "Image không được để trống",
  }),
  title: joi.string().required().messages({
    "string.empty": "Tiêu đề không được để trống",
    "any.required": "Tiêu đề là trường bắt buộc",
  }),
  description: joi.string().required().messages({
    "string.empty": "Mô tả không được để trống",
    "any.required": "Trường mô tả là bắt buộc",
  }),
  created_at: joi.string().required().messages({
    "any.required": "Ngày tạo không được để trống",
  }),
  user_id: joi.number().required().messages({
    "number.base": "userId phải là số",
    "any.required": "Trường user_id là bắt buộc",
  }),
});
