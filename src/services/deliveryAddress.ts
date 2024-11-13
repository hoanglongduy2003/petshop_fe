import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TDeliveryAddress } from "../schema/deliveryAddress";

const deliveryAddressApi = createApi({
  reducerPath: "deliveryAddress",
  tagTypes: ["DeliveryAddress"],
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
      listDeliveryAddress: builder.query<TDeliveryAddress[], number>({
        query: (id) => {
          return {
            url: `/deliveryAddressUser/${id} `,
            method: "GET",
          };
        },
        providesTags: ["DeliveryAddress"],
      }),
      createDeliveryAddress: builder.mutation<any, TDeliveryAddress>({
        query: (body) => ({
          url: `/deliveryAddress`,
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["DeliveryAddress"],
      }),
      updateDeliveryAddress: builder.mutation<any, TDeliveryAddress>({
        query: (body) => {
          return {
            url: `/deliveryAddress/${body.id}`,
            method: "PUT",
            body: body,
          };
        },
        invalidatesTags: ["DeliveryAddress"],
      }),
      deleteDeliveryAddress: builder.mutation<any, TDeliveryAddress>({
        query: (id) => {
          return {
            url: `/deliveryAddress/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["DeliveryAddress"],
      }),
    };
  },
});

export const { useListDeliveryAddressQuery, useCreateDeliveryAddressMutation,useUpdateDeliveryAddressMutation, useDeleteDeliveryAddressMutation } =
  deliveryAddressApi;
export const deliveryAddressReducer = deliveryAddressApi.reducer;
export default deliveryAddressApi;
