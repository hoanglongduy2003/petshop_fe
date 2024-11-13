import joi from "joi";

export const messageSchema = joi.object({
  id: joi.number(),
  text: joi.string().required().messages({
    "String.empty": " text không được để trống",
  }),
});
