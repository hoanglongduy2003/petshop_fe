import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TpetHouse } from "../schema/pethouse";
import { TBlockService } from "../schema/services";

const pethouseApi = createApi({
  reducerPath: "pethouse",
  tagTypes: ["PetHouse"],
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
      getAllpetHouseClient: builder.query<TpetHouse[], void>({
        query: () => {
          return {
            url: "/petHouseClient",
            method: "GET",
          };
        },
        providesTags: ["PetHouse"],
      }),
      getAllpetHouse: builder.query<TpetHouse[], void>({
        query: () => {
          return {
            url: "/pethouse",
            method: "GET",
          };
        },
        providesTags: ["PetHouse"],
      }),
      petHouseById: builder.query<TpetHouse, number>({
        query: (id) => {
          return {
            url: `/pethouse/${id}`,
            method: "GET",
          };
        },
        providesTags: ["PetHouse"],
      }),
      createPetHouse: builder.mutation<TpetHouse, TpetHouse>({
        query: (pethouse) => ({
          url: `/pethouse`,
          method: "POST",
          body: pethouse,
        }),
        invalidatesTags: ["PetHouse"],
      }),
      updatePetHouse: builder.mutation<TpetHouse, TpetHouse>({
        query: (updatedPethouse) => ({
          url: `/pethouse/${updatedPethouse.id}`,
          method: "PUT",
          body: updatedPethouse,
        }),
        invalidatesTags: ["PetHouse"],
      }),
      removePetHouse: builder.mutation<TpetHouse, number>({
        query: (id) => {
          return {
            url: `/pethouse/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["PetHouse"],
      }),
      updateBlockPetHouse: builder.mutation<
        TBlockService,
        Partial<TBlockService>
      >({
        query: (petHouse) => {
          return {
            url: `/petHouse/block`,
            method: "PATCH",
            body: petHouse,
          };
        },
        invalidatesTags: ["PetHouse"],
      }),
      petHousePost: builder.mutation<any, any>({
        query: (petHouse) => {
          return {
            url: `/petHousePost`,
            method: "POST",
            body: petHouse,
          };
        },
        invalidatesTags: ["PetHouse"],
      }),
      checkPetHouse: builder.mutation<TpetHouse[], any>({
        query: (id) => {
          return {
            url: "/checkPetHouse",
            method: "POST",
            body: id,
          };
        },
        invalidatesTags: ["PetHouse"],
      }),
    };
  },
});

export const {
  useGetAllpetHouseClientQuery,
  useGetAllpetHouseQuery,
  usePetHousePostMutation,
  usePetHouseByIdQuery,
  useUpdatePetHouseMutation,
  useCreatePetHouseMutation,
  useRemovePetHouseMutation,
  useUpdateBlockPetHouseMutation,
  useCheckPetHouseMutation,
} = pethouseApi;
export const pethouseReducer = pethouseApi.reducer;
export default pethouseApi;
