import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BannerResponseSchema, TBanner } from "../schema/banner";

const BannerApi = createApi({
  reducerPath: "banner",
  tagTypes: ["Banner"],
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
      getAllBanner: builder.query<TBanner[], void>({
        query: () => {
          return {
            url: "/banner",
            method: "GET",
          };
        },
        providesTags: ["Banner"],
      }),
      getBannerById: builder.query<TBanner, number>({
        query: (id) => {
          return {
            url: `/banner/${id}`,
            method: "GET",
          };
        },
        providesTags: ["Banner"],
      }),
      updateBanner: builder.mutation<TBanner[], Partial<TBanner>>({
        query: (banner) => {
          return {
            url: `/editBanner`,
            method: "PATCH",
            body: banner,
          };
        },
        invalidatesTags: ["Banner"],
      }),
      createBanner: builder.mutation<BannerResponseSchema, Partial<TBanner>>({
        query: (banner) => ({
          url: "/banner",
          method: "POST",
          body: banner,
        }),
        invalidatesTags: ["Banner"],
      }),
      removeBanner: builder.mutation<TBanner, number>({
        query: (id) => {
          return {
            url: `/banner/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Banner"],
      }),
    };
  },
});

export const {
  useGetAllBannerQuery,
  useCreateBannerMutation,
  useRemoveBannerMutation,
  useGetBannerByIdQuery,
  useUpdateBannerMutation,
} = BannerApi;
export const bannerReducer = BannerApi.reducer;
export default BannerApi;
