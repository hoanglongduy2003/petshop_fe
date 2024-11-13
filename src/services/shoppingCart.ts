import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cartsApi = createApi({
  reducerPath: "Carts",
  tagTypes: ["Carts"],
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
      getUserListCarts: builder.query<any, void>({
        query: () => {
          return {
            url: "/getUserListCarts",
            method: "GET",
          };
        },
        providesTags: ["Carts"],
      }),
      updateQuantityCarts: builder.mutation<any, any>({
        query: (cart) => ({
          url: `/updateCarts/${cart.id}`,
          method: "PATCH",
          body: cart,
        }),
        invalidatesTags: ["Carts"],
      }),
      addToCarts: builder.mutation<any, any>({
        query: (cart) => ({
          url: `/addCarts`,
          method: "POST",
          body: cart,
        }),
        invalidatesTags: ["Carts"],
      }),
      removeCartsById: builder.mutation<number, number>({
        query: (id) => {
          return {
            url: `/deleteIDCarts/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Carts"],
      }),
    };
  },
});

export const {
  useGetUserListCartsQuery,
  useUpdateQuantityCartsMutation,
  useAddToCartsMutation,
  useRemoveCartsByIdMutation
} = cartsApi;
export const cartsReducer = cartsApi.reducer;
export default cartsApi;
