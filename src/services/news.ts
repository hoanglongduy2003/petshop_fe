import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TNews } from "../schema/news";

const newsApi = createApi({
  reducerPath: "news",
  tagTypes: ["News"],
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
      news: builder.query<TNews[], void>({
        query: () => {
          return {
            url: "/getNewsUsers",
            method: "GET",
          };
        },
        providesTags: ["News"],
      }),
      newsTop3: builder.query<TNews[], void>({
        query: () => {
          return {
            url: "/newsTop3",
            method: "GET",
          };
        },
        providesTags: ["News"],
      }),
      newsTop8: builder.query<TNews[], void>({
        query: () => {
          return {
            url: "/newsTop8",
            method: "GET",
          };
        },
        providesTags: ["News"],
      }),
      addNews: builder.mutation<TNews, Partial<TNews>>({
        query: (News) => ({
          url: `/news`,
          method: "POST",
          body: News,
        }),
        invalidatesTags: ["News"],
      }),
      removeNews: builder.mutation<TNews, number>({
        query: (id) => {
          return {
            url: `/news/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["News"],
      }),

      newsById: builder.query<TNews, number>({
        query: (id) => {
          return {
            url: `/news/${id}`,
            method: "GET",
          };
        },
        providesTags: ["News"],
      }),

      updateNews: builder.mutation<TNews, TNews>({
        query: (updatedNews) => ({
          url: `/news/${updatedNews.id}`,
          method: "PUT",
          body: updatedNews,
        }),
        invalidatesTags: ["News"],
      }),
    };
  },
});

export const {
  useNewsQuery,
  useNewsTop3Query,
  useNewsTop8Query,
  useAddNewsMutation,
  useRemoveNewsMutation,
  useUpdateNewsMutation,
  useNewsByIdQuery,
} = newsApi;
export const newsReducer = newsApi.reducer;
export default newsApi;
