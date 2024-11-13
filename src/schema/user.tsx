import * as yup from "yup";

export const UserSchema = yup.object().shape({
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

export const UserRequestSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
  img: yup.string(),
  email: yup.string(),
  password: yup.string(),
  phone: yup.string(),
  address: yup.string(),
  nameRole: yup.number(),
});

export const UserResponseSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
  img: yup.string(),
  email: yup.string(),
  password: yup.string(),
  phone: yup.string(),
  address: yup.string(),
});

export const UserErrorSchema = yup.object({});

export type TUser = yup.InferType<typeof UserSchema>;

export type UserResponse = yup.InferType<typeof UserResponseSchema>;

export type UserError = yup.InferType<typeof UserErrorSchema>;

export const BlockUserSchema = yup.object().shape({
  id: yup.number().required(),
  is_delete: yup.number().required(),
});

export type TBlockUser = yup.InferType<typeof BlockUserSchema>;

export const RoleUserSchema = yup.object().shape({
  id: yup.number().required(),
  role_id: yup.number().required(),
});

export type TRoleUser = yup.InferType<typeof RoleUserSchema>;