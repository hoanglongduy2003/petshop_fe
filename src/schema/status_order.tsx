import * as yup from "yup";

export const StatusOrderSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
});

export const StatusOrderRequestSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
});

export const StatusOrderResponseSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
});

export const StatusOrderErrorSchema = yup.object({});

export type TStatusOrder = yup.InferType<typeof StatusOrderSchema>;

export type StatusOrderResponse = yup.InferType<typeof StatusOrderResponseSchema>;

export type StatusOrderError = yup.InferType<typeof StatusOrderErrorSchema>;