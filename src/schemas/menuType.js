import joi from "joi";

export const menuTypeSchema = joi.object({
  id: joi.number(),
  name: joi.string().required().messages({
    "String.empty": "MenuType không được để trống",
  }),
});
