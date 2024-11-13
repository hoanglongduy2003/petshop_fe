import * as yup from "yup";
const phoneRegExp = /^0\d{9}$/;
export const RegisterAccountSchema = yup.object().shape({
  email: yup.string().trim(),
  name: yup.string().trim().required("Vui lòng nhập tên"),
  password: yup
    .string()
    .min(8, "mật khẩu tối đa 8 kí tự")
    .trim()
    .required("Vui lòng nhập mật khẩu")
    .matches(/^(?=.*\d)/, "Mật khẩu phải có ít nhất một ký tự số.")
    .matches(/^(?=.*[A-Z])/, "Mật khẩu phải có ít nhất một ký tự viết hoa."),
  phone: yup
    .string()
    .trim()
    .matches(
      phoneRegExp,
      "Số điện thoại phải bắt đầu bằng số 0 và phải là số nguyên."
    )
    .min(10, "số điện thoại tối thiểu phải 10 kí tự")
    .required("Vui lòng điền số điện thoại"),
  address: yup.string().trim(),
});

export type TRegisterAccount = yup.InferType<typeof RegisterAccountSchema>;

export const RegisterAccountRequestSchema = yup.object().shape({});

export const RegisterAccountRequest = yup.object().shape({
  token: yup.string(),
  id: yup.number().required(),
});

export type TRegisterAccountRequest = yup.InferType<
  typeof RegisterAccountRequest
>;
