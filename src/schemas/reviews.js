import joi from "joi";

export const reviewSchema = joi.object({
  id: joi.number(),
  user_id: joi.number().required().messages({
    "number.empty": "user_id không được để trống",
    "any.required": "user_id là trường bắt buộc",
  }),
  rating: joi.number().required().messages({
    "number.empty": "rating không được để trống",
    "any.required": "rating là trường bắt buộc",
  }),
  comment: joi.string(),
  created_at: joi.string().required().messages({
    "any.required": "Ngày tạo không được để trống",
  }),
  services_id: joi.number(),
  product_id: joi.number(),
});
