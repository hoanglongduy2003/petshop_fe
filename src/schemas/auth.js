import joi from "joi";
export const signupSchema = joi.object({
    name: joi.string().required().messages({
        "string.empty": "Tên không được để trống",
        "any.required": "Trường tên là bắt buộc",
    }),
    email: joi.string().email().required().messages({
        "string.empty": "Email không được để trống",
        "any.required": "Trường email là bắt buộc",
        "string.email": "Email không đúng định dạng",
    }),
    phone: joi.string().regex(/^0\d{9}$/).required().messages({
        "String.empty": "Số điện thoại không được để trống",
        "any.required": "Trường số điện thoại là bắt buộc",
        "string.pattern.base": "Số điện thoại phải bắt đầu bằng số 0 và có đúng 10 chữ số",
    }),
    address: joi.string().required().messages({
        "string.empty": "Address không được để trống",
        "any.required": "Trường address là bắt buộc",
    }),
    password: joi.string().required().min(6).messages({
        "string.empty": "Mật khẩu không được để trống",
        "any.required": "Trường mật khẩu là bắt buộc",
        "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
    }),
});

export const signinSchema = joi.object({
    email: joi.string().email().required().messages({
        "string.empty": "Email không được để trống",
        "any.required": "Trường email là bắt buộc",
        "string.email": "Email không đúng định dạng",
    }),
    password: joi.string().required().min(6).messages({
        "string.empty": "Mật khẩu không được để trống",
        "any.required": "Trường mật khẩu là bắt buộc",
        "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
    }),
});