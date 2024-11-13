import joi from "joi";

export const statusOrderSchema = joi.object({
  id: joi.number(),
  name: joi.string().required().messages({
    "String.empty": "Status order không được để trống",
  }),
});
