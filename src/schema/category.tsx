import * as yup from "yup";

export const categorySchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
});

export const categoryRequestSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
});

export const categoryResponseSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
});

export const categoryErrorSchema = yup.object({});

export type Tcategory = yup.InferType<typeof categorySchema>;

export type categoryResponse = yup.InferType<typeof categoryRequestSchema>;

export type categoryError = yup.InferType<typeof categoryErrorSchema>;
