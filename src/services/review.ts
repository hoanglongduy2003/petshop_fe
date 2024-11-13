import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TBlockReview, TCreateReview, TReview } from "../schema/review";

const reviewApi = createApi({
  reducerPath: "review",
  tagTypes: ["Review"],
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
      review: builder.query<TReview[], void>({
        query: () => {
          return {
            url: "/reviews",
            method: "GET",
          };
        },
        providesTags: ["Review"],
      }),
      updateBlockReview: builder.mutation<TBlockReview, Partial<TBlockReview>>({
        query: (review) => {
          return {
            url: "/blockReview",
            method: "PATCH",
            body: review,
          };
        },
        invalidatesTags: ["Review"],
      }),
      createReview: builder.mutation<any, Partial<TCreateReview>>({
        query: (review) => {
          return {
            url: "/review",
            method: "POST",
            body: review,
          };
        },
        invalidatesTags: ["Review"],
      }),
    };
  },
});

export const {
  useReviewQuery,
  useCreateReviewMutation,
  useUpdateBlockReviewMutation,
} = reviewApi;
export const reviewReducer = reviewApi.reducer;
export default reviewApi;
