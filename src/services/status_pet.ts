import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TStatusPet } from "../schema/pets";

const statusPetApi = createApi({
  reducerPath: "status_pet",
  tagTypes: ["Status_pet"],
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
      getAllstatusPet: builder.query<TStatusPet[], void>({
        query: () => {
          return {
            url: "/status_pet",
            method: "GET",
          };
        },
        providesTags: ["Status_pet"],
      }),

      getStatusPetById: builder.query<TStatusPet, number>({
        query: (status_pet) => {
          return {
            url: `/status_pet/${status_pet}`,
            method: "GET",
          };
        },
        providesTags: ["Status_pet"],
      }),

      createStatuspet: builder.mutation<TStatusPet[], Partial<TStatusPet>>({
        query: (status) => ({
          url: "/status_pet",
          method: "POST",
          body: status,
        }),
        invalidatesTags: ["Status_pet"],
      }),

      updateStatuspet: builder.mutation<TStatusPet, TStatusPet>({
        query: (status) => ({
          url: `/status_pet/${status.id}`,
          method: "PUT",
          body: status,
        }),
        invalidatesTags: ["Status_pet"],
      }),
      removeStatuspet: builder.mutation<TStatusPet, number>({
        query: (id) => ({
          url: `/status_pet/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Status_pet"],
      }),
    };
  },
});

export const {
  useGetAllstatusPetQuery,
  useGetStatusPetByIdQuery,
  useUpdateStatuspetMutation,
  useCreateStatuspetMutation,
  useRemoveStatuspetMutation,
} = statusPetApi;
export const statusPetReducer = statusPetApi.reducer;
export default statusPetApi;
