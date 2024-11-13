import * as yup from "yup";

export const MenuSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
  link: yup.string(),
  menuType_id: yup.number(),
  nameMenuMenuType: yup.string(),
  isButton: yup.boolean(),
  route: yup.string(),
});

export const MenuRequestSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
  link: yup.string(),
  menuType_id: yup.number(),
  nameMenuMenuType: yup.string(),
  isButton: yup.boolean(),
  route: yup.string(),
});

export const MenuResponseSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
  link: yup.string(),
  menuType_id: yup.number(),
  nameMenuMenuType: yup.string(),
  isButton: yup.boolean(),
  route: yup.string(),
});

export const MenuErrorSchema = yup.object({});

export type TMenu = yup.InferType<typeof MenuSchema>;

export type MenuResponse = yup.InferType<typeof MenuResponseSchema>;

export type MenuError = yup.InferType<typeof MenuErrorSchema>;

export const MenuAddSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
  link: yup.string(),
  menuType_id: yup.number(),
});

export type TMenuAdd = yup.InferType<typeof MenuAddSchema>;
