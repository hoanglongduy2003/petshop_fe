import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tspecies } from "../schema/species";

const speciesApi = createApi({
  reducerPath: "species",
  tagTypes: ["Species"],
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
        getAllspecies: builder.query<Tspecies[], void>({
        query: () => {
          return {
            url: "/species",
            method: "GET",
          };
        },
        providesTags: ["Species"],

      }),
      getSpeciesById: builder.query<Tspecies, number>({
        query: (species) => {
          return {
            url: `/species/${species}`,
            method: "GET",
          };
        },
        providesTags: ["Species"],
      }),
      createSpecies: builder.mutation<Tspecies[], Partial<Tspecies>>({
        query: (species) => ({
          url: "/species",
          method: "POST",
          body: species, 
        }),
        invalidatesTags: ["Species"],

      }),
      updateSpecies: builder.mutation<Tspecies, Tspecies>({
        query: (species) => ({
            url: `/species/${species.id}`,
            method: "PUT",
            body: species
        }),
        invalidatesTags: ["Species"],
    }),
      removeSpecies: builder.mutation<Tspecies, number>({
        query: (id) => {
          return {
            url: `/species/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Species"],
      }),
    };
  },
});

export const { useGetAllspeciesQuery , useGetSpeciesByIdQuery , useUpdateSpeciesMutation , useCreateSpeciesMutation, useRemoveSpeciesMutation} = speciesApi;
export const speciesReducer = speciesApi.reducer;
export default speciesApi;
