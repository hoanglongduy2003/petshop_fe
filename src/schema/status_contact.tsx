import * as yup from "yup";

export const StatusContactSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
});

export const StatusContactRequestSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
});

export const StatusContactResponseSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
});

export const StatusContactErrorSchema = yup.object({});

export type TStatusContact = yup.InferType<typeof StatusContactSchema>;

export type StatusContactResponse = yup.InferType<typeof StatusContactResponseSchema>;

export type StatusContactError = yup.InferType<typeof StatusContactErrorSchema>;