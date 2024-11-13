import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TOrderAdminSchema, TOrderAdminSchemaRq } from "../schema/order";

const orderApi = createApi({
  reducerPath: "order",
  tagTypes: ["order"],
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
      createOrder: builder.mutation<any, any>({
        query: (data) => ({
          url: `/createOrder`,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["order"],
      }),
      updateOrderStatus: builder.mutation<any, any>({
        query: (data) => ({
          url: `/updateStatusOrder`,
          method: "PATCH",
          body: data,
        }),
        invalidatesTags: ["order"],
      }),
      updateStatusPaymentOrder: builder.mutation<any, any>({
        query: (data) => ({
          url: `/updateStatusPaymentOrder`,
          method: "PATCH",
          body: data,
        }),
        invalidatesTags: ["order"],
      }),
      getAllOrderUser: builder.query<TOrderAdminSchema[], void>({
        query: () => {
          return {
            url: "/getAllOrderUser",
            method: "GET",
          };
        },
        providesTags: ["order"],
      }),
      getOrderByIdUserAndIdStatus: builder.query<TOrderAdminSchemaRq, number>({
        query: (id) => {
          return {
            url: `/getOrderByIdUserAndIdStatus/${id}`,
            method: "GET",
          };
        },
        providesTags: ["order"],
      }),
      searchOrderAdmin: builder.mutation<TOrderAdminSchema[], any>({
        query: (order) => {
          return {
            url: "/searchOrder",
            method: "POST",
            body: order,
          };
        },
        invalidatesTags: ["order"],
      }),
    };
  },
});

export const {
  useCreateOrderMutation,
  useUpdateOrderStatusMutation,
  useUpdateStatusPaymentOrderMutation,
  useGetAllOrderUserQuery,
  useGetOrderByIdUserAndIdStatusQuery,
  useSearchOrderAdminMutation,
} = orderApi;
export const orderReducer = orderApi.reducer;
export default orderApi;
