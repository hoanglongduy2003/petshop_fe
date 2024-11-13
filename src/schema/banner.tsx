/* eslint-disable @typescript-eslint/no-redeclare */
import * as yup from "yup";

export const BannerSchema = yup.object().shape({
  id: yup.number(),
  img: yup.string(),
  title: yup.string(),
  slogan: yup.string(),
  link: yup.string(),
});

export const BannerRequestSchema = yup.object().shape({
  id: yup.number(),
  img: yup.string(),
  title: yup.string(),
  slogan: yup.string(),
  link: yup.string(),
});

export const BannerResponseSchema = yup.object().shape({
  id: yup.number(),
  img: yup.string(),
  title: yup.string(),
  slogan: yup.string(),
  link: yup.string(),
});

export const BannerErrorSchema = yup.object({});

export type TBanner = yup.InferType<typeof BannerSchema>;

export type BannerResponseSchema = yup.InferType<typeof BannerResponseSchema>;

export type BannerError = yup.InferType<typeof BannerErrorSchema>;
