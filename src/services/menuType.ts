import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TMenuType } from "../schema/menuType";

const menuTypeApi = createApi({
  reducerPath: "menuType",
  tagTypes: ["MenuType"],
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
      menuType: builder.query<TMenuType[], void>({
        query: () => {
          return {
            url: "/menutype",
            method: "GET",
          };
        },
        providesTags: ["MenuType"],
      }),
      menuTypeById: builder.query<TMenuType, number>({
        query: (id) => {
          return {
            url: `/menutype/${id}`,
            method: "GET",
          };
        },
        providesTags: ["MenuType"],
      }),

      createMenuType: builder.mutation<TMenuType[], Partial<TMenuType>>({
        query: (menutypeData) => ({
          url: "/menutype",
          method: "POST",
          body: menutypeData,
        }),
      }),
      updateMenuType: builder.mutation<TMenuType, Partial<TMenuType>>({
        query: (menutype) => {
          return {
            url: `/editmenutype`,
            method: "PATCH",
            body: menutype,
          };
        },
        invalidatesTags: ["MenuType"],
      }),
      removeMenuType: builder.mutation<TMenuType, number>({
        query: (id) => {
          return {
            url: `/menutype/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["MenuType"],
      }),
    };
  },
});

export const {
  useMenuTypeQuery,
  useMenuTypeByIdQuery,
  useCreateMenuTypeMutation,
  useUpdateMenuTypeMutation,
  useRemoveMenuTypeMutation,
} = menuTypeApi;
export const menuTypeReducer = menuTypeApi.reducer;
export default menuTypeApi;
