import joi from "joi";

export const speciesSchema = joi.object({
  id: joi.number(),
  name: joi.string().required().messages({
    "String.empty": "Tên không được để trống",
  }),
});
