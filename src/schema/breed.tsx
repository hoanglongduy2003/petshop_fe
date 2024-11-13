import * as yup from "yup";

export const BreedSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
  species_id: yup.mixed(),
  speciesName: yup.string(),
});

export const BreedRequestSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
  species_id: yup.mixed(),
  speciesName: yup.string(),
});

export const BreedResponseSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
  species_id: yup.mixed(),
  speciesName: yup.string(),
});

export const BreedErrorSchema = yup.object({});

export type TBreed = yup.InferType<typeof BreedSchema>;

export type BreedResponse = yup.InferType<typeof BreedResponseSchema>;

export type BreedError = yup.InferType<typeof BreedErrorSchema>;

export const BreedAddSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
  species_id: yup.string(),
});

export type TBreedAdd = yup.InferType<typeof BreedAddSchema>;
