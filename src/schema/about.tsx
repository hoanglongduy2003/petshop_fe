import * as yup from "yup";

export const AboutSchema = yup.object().shape({
  id: yup.number(),
  image: yup.string(),
  description: yup.string(),
});

export const AboutRequestSchema = yup.object().shape({
  id: yup.number(),
  image: yup.string(),
  description: yup.string(),
});

export const AboutResponseSchema = yup.object().shape({
  id: yup.number(),
  image: yup.string(),
  description: yup.string(),
});

export const AboutErrorSchema = yup.object({});

export type TAbout = yup.InferType<typeof AboutSchema>;

export type AboutResponse = yup.InferType<typeof AboutResponseSchema>;

export type AboutError = yup.InferType<typeof AboutErrorSchema>;
