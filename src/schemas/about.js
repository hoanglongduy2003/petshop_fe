import joi from "joi";

export const aboutSchema = joi.object({
  id: joi.number(),
  image: joi.string().required().messages({
    "String.empty": " img không được để trống",
    "any.required": "img là trường bắt buộc",
  }),
  description: joi.string().required().messages({
    "String.empty": "description không được để trống",
  }),
});
