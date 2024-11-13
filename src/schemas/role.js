import joi from "joi";

export const roleSchema = joi.object({
  id: joi.number(),
  name: joi.string().required().messages({
    "String.empty": "Role không được để trống",
  }),
});
