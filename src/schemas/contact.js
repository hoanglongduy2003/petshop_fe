import joi from "joi";

export const contactSchema = joi.object({
    id: joi.number(),
    phone: joi.string().regex(/^0\d{9}$/).required().messages({
        "String.empty": "Số điện thoại không được để trống",
        "any.required": "Trường số điện thoại là bắt buộc",
        "string.pattern.base": "Số điện thoại phải bắt đầu bằng số 0 và có đúng 10 chữ số",
    }),
    title: joi.string().required().messages({
        "String.empty": "Tên không được để trống",
        "any.required": "Trường tên là bắt buộc",
    }),
    subject: joi.string().required().messages({
        "String.empty": "Subject không được để trống",
        "any.required": "Trường subject là bắt buộc",
    })
    ,
    user_id: joi.number().required().messages({
        "String.empty": "User_ID không được để trống",
        "any.required": "Trường User_ID là bắt buộc",
    }),
    status_id: joi.number().required().messages({
        "String.empty": "Status_id không được để trống",
        "any.required": "Trường Status_id là bắt buộc",
    })
});