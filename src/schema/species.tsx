import * as yup from "yup";

export const speciesSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
});

export const speciesRequestSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
});

export const speciesResponseSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
});

export const speciesErrorSchema = yup.object({});

export type Tspecies = yup.InferType<typeof speciesSchema>;

export type speciesResponse = yup.InferType<typeof speciesResponseSchema>;

export type speciesError = yup.InferType<typeof speciesErrorSchema>;
