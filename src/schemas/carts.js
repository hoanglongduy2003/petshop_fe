import joi from "joi";

export const cartsSchema = joi.object({
  id: joi.number(),
  user_id: joi.number().required().messages({
    "String.empty": "User_ID không được để trống",
    "any.required": "Trường User_ID là bắt buộc",
  }),
  products_id: joi.number().required().messages({
    "String.empty": "products_id không được để trống",
    "any.required": "Trường products_id là bắt buộc",
  }),
  quantity: joi.number().required().messages({
    "String.empty": "quantity không được để trống",
    "any.required": "Trường quantity là bắt buộc",
  }),
  created_at: joi.string(),
  updated_at: joi.string(),
});

export const cartsQuantitySchema = joi.object({
  id: joi.number(),
  quantity: joi.number().required().messages({
    "String.empty": "quantity không được để trống",
    "any.required": "Trường quantity là bắt buộc",
  }),
});
