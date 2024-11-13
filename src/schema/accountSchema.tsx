import * as yup from "yup";
const phoneRegExp = /^0\d{9}$/;

export const AccountSchema = yup.object().shape({
  email: yup.string().required(),
  id: yup.number().required(),
  name: yup.string().required(),
  phone: yup.string().required(),
  address: yup.string().required(),
  products: yup.array().of(yup.string()).required(),
  price: yup.array().of(yup.number()).required(),
});

export const AccountEditSchema = yup.object().shape({
  id: yup.number(),
  img: yup.string().required(),
  email: yup.string().required(),
  name: yup.string().required(),
  phone: yup
    .string()
    .trim()
    .matches(
      phoneRegExp,
      "Số điện thoại phải bắt đầu bằng số 0 và phải là số nguyên."
    )
    .min(10, "số điện thoại tối thiểu phải 10 kí tự")
    .required("Vui lòng điền số điện thoại"),
  gender: yup.number().required(),
});

export type TAccountEdit = yup.InferType<typeof AccountEditSchema>;

export type TAccount = yup.InferType<typeof AccountSchema>;
