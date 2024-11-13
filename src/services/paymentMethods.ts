import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const paymentMethodsApi = createApi({
  reducerPath: "paymentMethods",
  tagTypes: ["paymentMethods"],
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
      getAllPaymentMethods: builder.query<any[], void>({
        query: () => {
          return {
            url: "/paymentMethods",
            method: "GET",
          };
        },
        providesTags: ["paymentMethods"],
      }),
    };
  },
});

export const {
  useGetAllPaymentMethodsQuery,
} = paymentMethodsApi;
export const paymentMethodsReducer = paymentMethodsApi.reducer;
export default paymentMethodsApi;
