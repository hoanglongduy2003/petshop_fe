import * as yup from "yup";

export const InvoiceSchema = yup.object().shape({
  id: yup.number(),
  user_id: yup.number(),
  date: yup.date(),
  amount: yup.number(),
  paymentMethod: yup.string(),
  appointments_id: yup.number(),
  nameInvoice: yup.string(),
});

export const InvoiceOrderSchema = yup.object().shape({
  id: yup.number(),
  user_id: yup.number(),
  date: yup.date(),
  amount: yup.number(),
  paymentMethod: yup.string(),
  OrderId: yup.number(),
});

export const InvoiceRequestSchema = yup.object().shape({
  user_id: yup.number(),
  amount: yup.number(),
  paymentMethod: yup.string(),
  appointments_id: yup.number(),
});

export const InvoiceResponseSchema = yup.object().shape({
  id: yup.number(),
  user_id: yup.number(),
  date: yup.date(),
  amount: yup.number(),
  paymentMethod: yup.string(),
  appointments_id: yup.number(),
});

export const InvoiceErrorSchema = yup.object({});

export type TInvoice = yup.InferType<typeof InvoiceSchema>;

export type TInvoiceOder = yup.InferType<typeof InvoiceOrderSchema>;

export type InvoiceResponse = yup.InferType<typeof InvoiceResponseSchema>;

export type InvoiceError = yup.InferType<typeof InvoiceErrorSchema>;
