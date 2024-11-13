import * as yup from "yup";

export const MenuTypeSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
});

export const MenuTypeRequestSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
});

export const MenuTypeResponseSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
});

export const MenuTypeErrorSchema = yup.object({});

export type TMenuType = yup.InferType<typeof MenuTypeSchema>;

export type MenuTypeResponse = yup.InferType<typeof MenuTypeResponseSchema>;

export type MenuTypeError = yup.InferType<typeof MenuTypeErrorSchema>;
