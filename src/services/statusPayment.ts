import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TStatusPet } from "../schema/pets";

const statusPaymentApi = createApi({
  reducerPath: "statusPayment",
  tagTypes: ["statusPayment"],
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
      getAllStatusPayment: builder.query<TStatusPet[], void>({
        query: () => {
          return {
            url: "/statusPayment",
            method: "GET",
          };
        },
        providesTags: ["statusPayment"],
      }),
    };
  },
});

export const {
  useGetAllStatusPaymentQuery,
} = statusPaymentApi;
export const statusPaymentReducer = statusPaymentApi.reducer;
export default statusPaymentApi;
