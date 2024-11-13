import * as yup from "yup";

export const SignInSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

export const SignInRequestSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email không đúng định dạng.")
    .required("Vui lòng nhập đúng email."),
  password: yup
    .string()
    .min(8, "Mật khẩu phải tối đa 8 kí tự.")
    .required("Vui lòng nhập đúng mật khẩu."),
});

export const SignInResponseSchema = yup.object().shape({
  accessToken: yup.string().required(),
    user: yup.object().shape({
      address: yup.string().required(),
      email: yup.string().required(),
      id: yup.number().required(),
      img: yup.string().required(),
      name: yup.string().required(),
      password: yup.string().required(),
      phone: yup.number().required(),
      role_id: yup.number().required(),
    }).required(),
});

export const SignInErrorSchema = yup.object({});

export type TSignIn = yup.InferType<typeof SignInSchema>;

export type SignInResponse = yup.InferType<typeof SignInResponseSchema>;

export type SignInError = yup.InferType<typeof SignInErrorSchema>;