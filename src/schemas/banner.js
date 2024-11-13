import joi from "joi";

export const roleSchema = joi.object({
  id: joi.number(),
  img: joi.string().messages({
    "string.empty": "Image không được để trống",
  }),
  title: joi.string().required().messages({
    "string.empty": "Tiêu đề không được để trống",
    "any.required": "Tiêu đề là trường bắt buộc",
  }),
  slogan: joi.string().required().messages({
    "string.empty": "Slogan không được để trống",
    "any.required": "Trường Slogan là bắt buộc",
  }),
  link: joi.string().required().messages({
    "string.empty": "link không được để trống",
    "any.required": "link Slogan là bắt buộc",
  }),
});
