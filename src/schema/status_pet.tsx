import * as yup from "yup";

export const StatusPetSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
});

export const StatusPetRequestSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
});

export const StatusPetResponseSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
});

export const StatusPetErrorSchema = yup.object({});

export type TStatusPet = yup.InferType<typeof StatusPetSchema>;

export type StatusPetResponse = yup.InferType<typeof StatusPetResponseSchema>;

export type StatusPetError = yup.InferType<typeof StatusPetErrorSchema>;