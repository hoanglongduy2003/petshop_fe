import * as yup from "yup";

export const SignUpSchema = yup.object().shape({
  email: yup.string().required(),
});

export type TSignUp = yup.InferType<typeof SignUpSchema>;

export const SignUpRequestSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email không đúng định dạng')
    .required("Vui lòng nhập tên email"),
});