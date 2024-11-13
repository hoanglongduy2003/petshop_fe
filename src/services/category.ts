import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tcategory } from "../schema/category";

const categoryApi = createApi({
  reducerPath: "category",
  tagTypes: ["Category"],
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
      getAllcategory: builder.query<Tcategory[], void>({
        query: () => {
          return {
            url: "/category",
            method: "GET",
          };
        },
        providesTags: ["Category"],
      }),
      categoryById: builder.query<Tcategory, number>({
        query: (id) => {
          return {
            url: `/category/${id}`,
            method: "GET",
          };
        },
        providesTags: ["Category"],

      }),
      createCategory: builder.mutation<Tcategory, Tcategory>({
        query: (pethouse) => ({
            url: `/category`,
            method: "POST",
            body: pethouse
        }),
        invalidatesTags: ["Category"],

    }),
      updateCategory: builder.mutation<Tcategory, Tcategory>({
        query: (updatedCategory) => ({
            url: `/category/${updatedCategory.id}`,
            method: "PUT",
            body: updatedCategory
        }),
        invalidatesTags: ["Category"],
    }),
     removeCategory: builder.mutation<Tcategory, number>({
        query: (id) => {
          return {
            url: `/category/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Category"],
      }),
    };
  },
});

export const { useGetAllcategoryQuery , useCategoryByIdQuery , useUpdateCategoryMutation , useCreateCategoryMutation, useRemoveCategoryMutation}  = categoryApi;
export const categoryReducer = categoryApi.reducer;
export default categoryApi;
