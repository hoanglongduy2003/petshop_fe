import joi from "joi";

export const petSchema = joi.object({
  id: joi.number(),
  img: joi.string().messages({
    "String.empty": "Image không được để trống",
  }),
  name: joi.string().required().messages({
    "String.empty": "Tên không được để trống",
    "any.required": "Tên là trường bắt buộc",
  }),
  age: joi.number().required().messages({
    "Number.empty": "tuổi không được để trống",
    "any.required": "Trường tuổi là bắt buộc",
  }),
  gender: joi.string().messages({
    "String.empty": "giới tính không được để trống",
  }),
  user_id: joi.number().required().messages({
    "String.empty": "userId không được để trống",
    "any.required": "Trường user_id là bắt buộc",
  }),
  species_id: joi.number().required().messages({
    "String.empty": "speciesId không được để trống",
    "any.required": "Trường speciesId là bắt buộc",
  }),
  breed_id: joi.number().required().messages({
    "String.empty": "breedId không được để trống",
    "any.required": "Trường breedId là bắt buộc",
  }),
  status_id: joi.number(),
  health_condition: joi.string().allow(""),
});
