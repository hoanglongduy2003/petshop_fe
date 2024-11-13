import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TRole } from "../schema/role";

const roleApi = createApi({
  reducerPath: "role",
  tagTypes: ["Role"],
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
      role: builder.query<TRole[], void>({
        query: () => {
          return {
            url: "/role",
            method: "GET",
          };
        },
        providesTags: ["Role"],
      }),
      roleById: builder.query<TRole, number>({
        query: (id) => {
          return {
            url: `/role/${id}`,
            method: "GET",
          };
        },
        providesTags: ["Role"],
      }),

      createRole: builder.mutation<TRole[], Partial<TRole>>({
        query: (roleData) => ({
          url: "/role",
          method: "POST",
          body: roleData,
        }),
      }),
      updateRole: builder.mutation<TRole, Partial<TRole>>({
        query: (role) => {
          return {
            url: `/editRole`,
            method: "PATCH",
            body: role,
          };
        },
        invalidatesTags: ["Role"],
      }),
      removeRole: builder.mutation<TRole, number>({
        query: (id) => {
          return {
            url: `/role/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Role"],
      }),
    };
  },
});

export const {
  useRoleQuery,
  useRoleByIdQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useRemoveRoleMutation
} = roleApi;
export const roleReducer = roleApi.reducer;
export default roleApi;
