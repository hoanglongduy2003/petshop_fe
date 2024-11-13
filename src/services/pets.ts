import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PetUserId, PetsRequest, PetsResponse, TPets, TUserPet } from "../schema/pets";

const petsApi = createApi({
  reducerPath: "pets",
  tagTypes: ["Pets"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", "Bearer " + token);
      }
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      getAllPets: builder.query<TPets[], void>({
        query: () => {
          return {
            url: "/pets",
            method: "GET",
          };
        },
        providesTags: ["Pets"],
      }),
      getAllUserPets: builder.query<TPets[], void>({
        query: () => {
          return {
            url: `/ListUserPets`,
            method: "GET",
          };
        },
        providesTags: ["Pets"],
      }),
      getPetById: builder.query<PetsRequest, number>({
        query: (id) => {
          return {
            url: `/pets/${id}`,
            method: "GET",
          };
        },
        providesTags: ["Pets"],
      }),
      getPetByIdPost: builder.mutation<PetsRequest[], PetUserId>({
        query: (user) => {
          return {
            url: `listPetByUserId`,
            method: "POST",
            body: user,
          };
        },
        invalidatesTags: ["Pets"],
      }),
      createPets: builder.mutation<PetsResponse, Partial<TPets>>({
        query: (pets) => ({
          url: "/pets",
          method: "POST",
          body: pets,
        }),
        invalidatesTags: ["Pets"],
      }),
      updatePets: builder.mutation<PetsRequest, Partial<PetsRequest>>({
        query: (pets) => {
          return {
            url: `/pets/${pets.id}`,
            method: "PUT",
            body: pets,
          };
        },
        invalidatesTags: ["Pets"],
      }),
      userPet: builder.mutation<TPets[], Partial<TUserPet>>({
        query: (pets) => ({
          url: "/userPet",
          method: "PATCH",
          body: pets,
        }),
        invalidatesTags: ["Pets"],
      }),
      removePets: builder.mutation<TPets, number>({
        query: (id) => {
          return {
            url: `/pets/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Pets"],
      }),
    };
  },
});

export const {
  useGetAllPetsQuery,
  useGetAllUserPetsQuery,
  useGetPetByIdQuery,
  useUpdatePetsMutation,
  useCreatePetsMutation,
  useRemovePetsMutation,
  useUserPetMutation,
  useGetPetByIdPostMutation,
} = petsApi;
export const petsReducer = petsApi.reducer;
export default petsApi;
