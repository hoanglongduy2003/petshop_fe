import * as yup from "yup";

export const RoleSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
});

export const RoleRequestSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
});

export const RoleResponseSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
});

export const RoleErrorSchema = yup.object({});

export type TRole = yup.InferType<typeof RoleSchema>;

export type RoleResponse = yup.InferType<typeof RoleResponseSchema>;

export type RoleError = yup.InferType<typeof RoleErrorSchema>;
