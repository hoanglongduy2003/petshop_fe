import joi from "joi";

export const productsSchema = joi.object({
  id: joi.number(),
  name: joi.string().required().messages({
    "String.empty": "Tên products không được để trống",
    "any.required": "Tên products là trường bắt buộc",
  }),
  description: joi.string().required().messages({
    "String.empty": " description không được để trống",
    "any.required": "description là trường bắt buộc",
  }),
  price: joi.number().required().messages({
    "String.empty": " price không được để trống",
    "any.required": "price là trường bắt buộc",
  }),
  img: joi.string().required().messages({
    "String.empty": " img không được để trống",
    "any.required": "img là trường bắt buộc",
  }),
  quantity: joi.number().required().messages({
    "Number.empty": " quantity không được để trống",
    "any.required": "quantity là trường bắt buộc",
  }),
  category_id: joi.number().required().messages({
    "String.empty": "category_id không được để trống",
    "any.required": "Trường category_id là bắt buộc",
  }),
});

export const productsUpdateQuatitySchema = joi.object({
  id: joi.number(),
  quantity: joi.number().required().messages({
    "Number.empty": " quantity không được để trống",
    "any.required": "quantity là trường bắt buộc",
  }),
});
