import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TBreed } from "../schema/breed";

const breedApi = createApi({
  reducerPath: "breed",
  tagTypes: ["Breed"],
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
      getAllBreed: builder.query<TBreed[], void>({
        query: () => {
          return {
            url: `/breeds`,
            method: "GET",
          };
        },
        providesTags: ["Breed"],
      }),
      breed: builder.query<TBreed[], number>({
        query: (id) => {
          return {
            url: `/getAllBreedsSpecies/${id}`,
            method: "GET",
          };
        },
        providesTags: ["Breed"],
      }),
      getBreedById: builder.query<TBreed, number>({
        query: (id) => {
          return {
            url: `/breed/${id}`,
            method: "GET",
          };
        },
        providesTags: ["Breed"],
      }),
      updateBreed: builder.mutation<TBreed[], TBreed>({
        query: (breed) => {
          return {
            url: `/breed/${breed.id}`,
            method: "PATCH",
            body: breed,
          };
        },
        invalidatesTags: ["Breed"],
      }),
      removeBreed: builder.mutation<TBreed, number>({
        query: (id) => {
          return {
            url: `/breed/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Breed"],
      }),
      createBreed: builder.mutation<TBreed, TBreed>({
        query: (breed) => ({
          url: `/breed`,
          method: "POST",
          body: breed,
        }),
        invalidatesTags: ["Breed"],
      }),
    };
  },
});

export const {
  useGetAllBreedQuery,
  useBreedQuery,
  useGetBreedByIdQuery,
  useUpdateBreedMutation,
  useRemoveBreedMutation,
  useCreateBreedMutation,
} = breedApi;
export const breedReducer = breedApi.reducer;
export default breedApi;
