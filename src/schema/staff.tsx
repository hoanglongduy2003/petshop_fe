import * as yup from "yup";

export const StaffSchema = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().required(),
  img: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  phone: yup.string().required(),
  address: yup.string().required(),
  role_id: yup.number().required(),
  nameRole: yup.string().required(),
  gender: yup.number().required(),
  is_delete: yup.boolean().required(),
});

export const StaffRequestSchema = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().required(),
  img: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  phone: yup.string().required(),
  address: yup.string().required(),
  role_id: yup.number().required(),
  nameRole: yup.string().required(),
  gender: yup.number().required(),
  is_delete: yup.boolean().required(),
});

export const StaffResponseSchema = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().required(),
  img: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  phone: yup.string().required(),
  address: yup.string().required(),
  role_id: yup.number().required(),
  nameRole: yup.string().required(),
  gender: yup.number().required(),
  is_delete: yup.boolean().required(),
});

export const StaffErrorSchema = yup.object({});

export type TStaff = yup.InferType<typeof StaffSchema>;

export type StaffResponse = yup.InferType<typeof StaffResponseSchema>;

export type StaffError = yup.InferType<typeof StaffErrorSchema>;
