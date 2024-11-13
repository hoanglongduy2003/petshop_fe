import joi from "joi";

export const footerSchema = joi.object({
  id: joi.number(),
  slogan: joi.string().required().messages({
    "string.empty": "Slogan không được để trống",
    "any.required": "Trường Slogan là bắt buộc",
  }),
  content_left: joi.string().required().messages({
    "string.empty": "content_left không được để trống",
    "any.required": "content_left là trường bắt buộc",
  }),

  content_right: joi.string().required().messages({
    "string.empty": "Nội dung bên phải không được để trống",
    "any.required": "Nội dung bên phải là bắt buộc",
  }),
  license: joi.string().required().messages({
    "string.empty": "Bản quyền không được để trống",
    "any.required": "Bản quyền là bắt buộc",
  }),
});
