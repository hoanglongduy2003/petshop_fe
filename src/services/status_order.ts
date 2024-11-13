import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TStatusOrder } from "../schema/status_order";

const statusOrderApi = createApi({
  reducerPath: "status_order",
  tagTypes: ["Status_order"],
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
      getAllStatusOrder: builder.query<TStatusOrder[], void>({
        query: () => {
          return {
            url: "/status_order",
            method: "GET",
          };
        },
        providesTags: ["Status_order"],
      }),

      getStatusOrderById: builder.query<TStatusOrder, number>({
        query: (status_contact) => {
          return {
            url: `/status_order/${status_contact}`,
            method: "GET",
          };
        },
        providesTags: ["Status_order"],
      }),

      createStatusOrder: builder.mutation<
      TStatusOrder[],
        Partial<TStatusOrder>
      >({
        query: (status) => ({
          url: "/status_order",
          method: "POST",
          body: status,
        }),
        invalidatesTags: ["Status_order"],
      }),

      updateStatusOrder: builder.mutation<TStatusOrder, TStatusOrder>({
        query: (status) => ({
          url: `/status_order/${status.id}`,
          method: "PUT",
          body: status,
        }),
        invalidatesTags: ["Status_order"],
      }),
      removeStatusOrder: builder.mutation<TStatusOrder, number>({
        query: (id) => ({
          url: `/status_order/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Status_order"],
      }),
    };
  },
});

export const {
  useGetAllStatusOrderQuery,
  useCreateStatusOrderMutation,
  useUpdateStatusOrderMutation,
  useGetStatusOrderByIdQuery,
  useRemoveStatusOrderMutation,
} = statusOrderApi;
export const statusOrderReducer = statusOrderApi.reducer;
export default statusOrderApi;
