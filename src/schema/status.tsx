import * as yup from "yup";

export const StatusSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
});

export const StatusRequestSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
});

export const StatusResponseSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
});

export const StatusErrorSchema = yup.object({});

export type TStatus = yup.InferType<typeof StatusSchema>;

export type StatusResponse = yup.InferType<typeof StatusResponseSchema>;

export type StatusError = yup.InferType<typeof StatusErrorSchema>;
