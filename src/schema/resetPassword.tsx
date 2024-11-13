import * as yup from "yup";

export const ResetPassSchema = yup.object().shape({
  email: yup.string().required(),
});

export type TResetPass = yup.InferType<typeof ResetPassSchema>;

export const ResetPassRequestSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email không đúng định dạng")
    .required("Vui lòng nhập email"),
});

export const ResetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Mật khẩu phải tối thiểu 8 ký tự.")
    .required("Vui lòng nhập mật khẩu."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Mật khẩu không khớp")
    .required("Vui lòng xác nhận mật khẩu."),
});

export const ResetPasswordUserSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Mật khẩu phải tối thiểu 8 ký tự.")
    .required("Vui lòng nhập mật khẩu."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Mật khẩu không khớp")
    .required("Vui lòng xác nhận mật khẩu."),
  token: yup.string().required("Vui lòng xác nhận mật khẩu."),
  email: yup
    .string()
    .email("Email không đúng định dạng")
    .required("Vui lòng nhập email"),
});

export const UpdatePasswordUserSchema = yup.object().shape({
  idUser: yup.number().required(),
  newPassword: yup
    .string()
    .min(8, "Mật khẩu phải tối đa 8 kí tự.")
    .required("Vui lòng nhập đúng mật khẩu."),
  oldPassword: yup
    .string()
    .min(8, "Mật khẩu phải tối đa 8 kí tự.")
    .required("Vui lòng nhập đúng mật khẩu."),
});
export type TResetPassword = yup.InferType<typeof ResetPasswordSchema>;

export type TResetPasswordUserSchema = yup.InferType<
  typeof ResetPasswordUserSchema
>;

export type TUpdatePasswordUserSchema = yup.InferType<
  typeof UpdatePasswordUserSchema
>;
