import joi from 'joi';

export const servicesSchema = joi.object({
  id: joi.number(),
  name: joi.string().required().messages({
    "String.empty": "Tên không được để trống",
    "any.required": "Trường tên là bắt buộc",
  }),
  image: joi.string().required().messages({
    "String.empty": "Tên không được để trống",
    "any.required": "Trường tên là bắt buộc",
  }),
  time: joi.string().required().messages({
    "String.empty": "Thời gian không được để trống",
    "any.required": "Trường tên là bắt buộc",
  }),
  description: joi.string().messages({
    "String.empty": "Description không được để trống",
  }),
  price: joi.number().required().messages({
    "Number.empty": "Price không được để trống",
    "any.required": "Trường price là bắt buộc",
  })
});