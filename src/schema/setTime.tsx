import * as yup from "yup";

export const SetTimeSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
  start_time: yup.string(),
  end_time: yup.string(),
});

export const SetTimeRequestSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
  time: yup.string(),
});

export const SetTimeResponseSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
  time: yup.string(),
});

export const SetTimeErrorSchema = yup.object({});

export type TSetTime = yup.InferType<typeof SetTimeSchema>;

export type SetTimeResponse = yup.InferType<typeof SetTimeResponseSchema>;

export type SetTimeError = yup.InferType<typeof SetTimeErrorSchema>;

export const SetTimeAddSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string().required(),
  start_time: yup.string().required(),
  end_time: yup.string().required(),
});

export type TSetTimeAdd = yup.InferType<typeof SetTimeAddSchema>;