import joi from "joi";

export const breedSchema = joi.object({
  id: joi.number(),
  name: joi.string().required().messages({
    "String.empty": "Tên giống không được để trống",
    "any.required": "Tên giống là trường bắt buộc",
  }),
  species_id: joi.number().required().messages({
    "String.empty": "speciesId không được để trống",
    "any.required": "Trường speciesId là bắt buộc",
  }),
});
