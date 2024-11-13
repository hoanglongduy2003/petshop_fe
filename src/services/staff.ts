import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TStaff } from "../schema/staff";

const staffApi = createApi({
  reducerPath: "staff",
  tagTypes: ["Staff"],
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
      staff: builder.query<TStaff[], void>({
        query: () => {
          return {
            url: "/staff",
            method: "GET",
          };
        },
        providesTags: ["Staff"],
      }),

      createStaff: builder.mutation<TStaff[], Partial<TStaff>>({
        query: (staffData) => ({
          url: "/staff",
          method: "POST",
          body: staffData,
        }),
        invalidatesTags: ["Staff"],
      }),

      getStaffById: builder.query<TStaff, number>({
        query: (staff) => {
          return {
            url: `/staff/${staff}`,
            method: "GET",
          };
        },
        providesTags: ["Staff"],
      }),

      updateStaff: builder.mutation<TStaff, TStaff>({
        query: (staff) => ({
          url: `/staff/${staff.id}`,
          method: "PUT",
          body: staff,
        }),
        invalidatesTags: ["Staff"],
      }),
      removeStaff: builder.mutation<TStaff, number>({
        query: (id) => {
          return {
            url: `/staff/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Staff"],
      }),
      updateRoleStaff: builder.mutation<TStaff, Partial<TStaff>>({
        query: (user) => {
          return {
            url: `/updateRole`,
            method: "PUT",
            body: user,
          };
        },
        invalidatesTags: ["Staff"],
      }),
    };

    
  },
});

export const {
  useStaffQuery,
  useCreateStaffMutation,
  useUpdateStaffMutation,
  useGetStaffByIdQuery,
  useRemoveStaffMutation,
} = staffApi;
export const staffReducer = staffApi.reducer;
export default staffApi;
