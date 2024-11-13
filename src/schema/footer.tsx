/* eslint-disable @typescript-eslint/no-redeclare */
import * as yup from "yup";

export const FooterSchema = yup.object().shape({
  id: yup.number(),
  slogan: yup.string(),
  content_left: yup.string(),
  content_right: yup.string(),
  license: yup.string(),
});

export const FooterRequestSchema = yup.object().shape({
  id: yup.number(),
  slogan: yup.string(),
  content_left: yup.string(),
  content_right: yup.string(),
  license: yup.string(),
});

export const FooterResponseSchema = yup.object().shape({
  id: yup.number(),
  slogan: yup.string(),
  content_left: yup.string(),
  content_right: yup.string(),
  license: yup.string(),
});

export const FooterErrorSchema = yup.object({});

export type TFooter = yup.InferType<typeof FooterSchema>;

export type FooterResponseSchema = yup.InferType<typeof FooterResponseSchema>;

export type FooterError = yup.InferType<typeof FooterErrorSchema>;
