import * as yup from "yup";

export const ContactSchema = yup.object().shape({
  id: yup.number(),
  phone: yup.string(),
  title: yup.string(),
  subject: yup.string(),
  user_id: yup.number(),
  status_id: yup.number(),
  nameUser: yup.string(),
});

export const ContactRequestSchema = yup.object().shape({
  id: yup.number(),
  phone: yup.string(),
  title: yup.string(),
  subject: yup.string(),
  user_id: yup.number(),
  status_id: yup.number(),
  nameUser: yup.string(),
});

export const ContactResponseSchema = yup.object().shape({
  id: yup.number(),
  phone: yup.string(),
  title: yup.string(),
  subject: yup.string(),
  user_id: yup.number(),
  status_id: yup.number(),
  nameUser: yup.string(),
});

export const ContactErrorSchema = yup.object({});

export type TContact = yup.InferType<typeof ContactSchema>;

export type ContactResponse = yup.InferType<typeof ContactResponseSchema>;

export type ContactError = yup.InferType<typeof ContactErrorSchema>;

export const StatusContactSchema = yup.object().shape({
  id: yup.number().required(),
  status_id: yup.number().required(),
});

export type TStaContact = yup.InferType<typeof StatusContactSchema>;
