/* eslint-disable @typescript-eslint/no-redeclare */
import * as yup from "yup";

export const WebsiteInformationSchema = yup.object().shape({
  id: yup.number(),
  logo: yup.string(),
  email: yup.string(),
  phone: yup.number(),
  address: yup.string(),
  fb: yup.string(),
  zalo: yup.string(),
});

export const WebsiteInformationRequestSchema = yup.object().shape({
  id: yup.number(),
  logo: yup.string(),
  email: yup.string(),
  phone: yup.number(),
  address: yup.string(),
  fb: yup.string(),
  zalo: yup.string(),
});

export const WebsiteInformationResponseSchema = yup.object().shape({
  id: yup.number(),
  logo: yup.string(),
  email: yup.string(),
  phone: yup.number(),
  address: yup.string(),
  fb: yup.string(),
  zalo: yup.string(),
});

export const WebsiteInformationErrorSchema = yup.object({});

export type TWebsiteInformation = yup.InferType<
  typeof WebsiteInformationSchema
>;

export type WebsiteInformationResponseSchema = yup.InferType<
  typeof WebsiteInformationResponseSchema
>;

export type WebsiteInformationError = yup.InferType<
  typeof WebsiteInformationErrorSchema
>;
