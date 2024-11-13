import joi, { number } from "joi";

export const appointmentsSchema = joi.object({
  id: joi.number(),
  day: joi.string().required().messages({
    "String.empty": "Tên không được để trống",
  }),
  pet: joi.array().items(number),
  services: joi.array().items(number),
  user_id: joi.number().required().messages({
    "String.empty": "User_ID không được để trống",
    "any.required": "Trường User_ID là bắt buộc",
  }),
  pethouse_id: joi.number().required().messages({
    "String.empty": "Pethouse_id không được để trống",
    "any.required": "Trường pethouse_id là bắt buộc",
  }),
  start_time: joi.string().required().messages({
    "String.empty": "start_time không được để trống",
  }),
  end_time: joi.string().required().messages({
    "String.empty": "end_time không được để trống",
  }),
  total: joi.number().required().messages({
    "String.empty": "total không được để trống",
  }),
  status_id: joi.number(),
  paymentMethods_id: joi.number().required().messages({
    "String.empty": "paymentMethods_id không được để trống",
  }),
});

export const updateAppointmentStatusSchema = joi.object({
  id: joi.number().required(),
  status_id: joi.number().required(),
});


export const updateAppointmentStatusPaymentSchema = joi.object({
  id: joi.number().required(),
  status_payment: joi.number().required(),
});