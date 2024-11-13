import * as yup from "yup";

export const PetsSchema = yup
  .object()
  .shape({
    id: yup.number(),
    img: yup.string(),
    name: yup.string(),
    age: yup.number(),
    gender: yup.string(),
    nameUser: yup.string(),
    nameSpecies: yup.number(),
    nameBreed: yup.number(),
  })
  .required();

export const PetsSchemaRes = yup.object().shape({
  id: yup.number(),
  img: yup.string(),
  name: yup.string(),
  age: yup.number(),
  gender: yup.string(),
  nameUser: yup.string(),
  nameSpecies: yup.number(),
  nameBreed: yup.number(),
});
export const PetsRequestSchema = yup.object().shape({
  id: yup.number(),
  img: yup.string().required(),
  name: yup.string().required(),
  age: yup.number().required(),
  gender: yup.string().required(),
  user_id: yup.number(),
  species_id: yup.number().required(),
  breed_id: yup.number().required(),
  status_id: yup.number(),
  health_condition: yup.string(),
});

export const PetsResponseSchema = yup.object().shape({
  data: PetsSchema,
  message: yup.string(),
});
export const petUserId = yup
  .object()
  .shape({
    id: yup.number().required(),
  })
  .required();
export const PetsErrorSchema = yup.object({});

export type TPets = yup.InferType<typeof PetsSchema>;

export type PetsRequest = yup.InferType<typeof PetsRequestSchema>;

export type TPetsSchemaRes = yup.InferType<typeof PetsSchemaRes>;

export type PetUserId = yup.InferType<typeof petUserId>;

export type PetsResponse = yup.InferType<typeof PetsResponseSchema>;

export type PetsError = yup.InferType<typeof PetsErrorSchema>;

export const UserPetsSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
});

export type TUserPets = yup.InferType<typeof UserPetsSchema>;

export const UserPetRequestSchema = yup.object().shape({
  data: yup.array().of(
    yup.object().shape({
      pet_id: yup.number().required(),
    })
  ),
});

export type TUserPet = yup.InferType<typeof UserPetRequestSchema>;
export const StatusPetSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
});

export type TStatusPet = yup.InferType<typeof StatusPetSchema>;
