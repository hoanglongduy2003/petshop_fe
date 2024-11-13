import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TMenu } from "../schema/menu";

const menuApi = createApi({
  reducerPath: "menu",
  tagTypes: ["Menu"],
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
      menu: builder.query<TMenu[], void>({
        query: () => {
          return {
            url: "/getMenuMenuType",
            method: "GET",
          };
        },
        providesTags: ["Menu"],
      }),
      addMenu: builder.mutation<TMenu, Partial<TMenu>>({
        query: (Menu) => ({
          url: `/menu`,
          method: "POST",
          body: Menu,
        }),
        invalidatesTags: ["Menu"],
      }),
      removeMenu: builder.mutation<TMenu, number>({
        query: (id) => {
          return {
            url: `/menu/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Menu"],
      }),

      menuById: builder.query<TMenu, number>({
        query: (id) => {
          return {
            url: `/menu/${id}`,
            method: "GET",
          };
        },
        providesTags: ["Menu"],
      }),

      updateMenu: builder.mutation<TMenu, TMenu>({
        query: (updatedMenu) => ({
          url: `/menu/${updatedMenu.id}`,
          method: "PUT",
          body: updatedMenu,
        }),
        invalidatesTags: ["Menu"],
      }),
    };
  },
});

export const {
  useMenuQuery,
  useAddMenuMutation,
  useRemoveMenuMutation,
  useUpdateMenuMutation,
  useMenuByIdQuery,
} = menuApi;
export const menuReducer = menuApi.reducer;
export default menuApi;
