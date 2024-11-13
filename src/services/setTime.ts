import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TSetTime, TSetTimeAdd } from "../schema/setTime";

const setTimeApi = createApi({
  reducerPath: "setTime",
  tagTypes: ["SetTime"],
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
      setTime: builder.query<TSetTime[], void>({
        query: () => {
          return {
            url: "/setTime",
            method: "GET",
          };
        },
        providesTags: ["SetTime"],
      }),
      setTimeById: builder.query<TSetTimeAdd, number>({
        query: (id) => {
          return {
            url: `/setTime/${id}`,
            method: "GET",
          };
        },
        providesTags: ["SetTime"],
      }),
      createSetTime: builder.mutation<TSetTime, TSetTime>({
        query: (setTime) => ({
          url: `/settime`,
          method: "POST",
          body: setTime,
        }),
        invalidatesTags: ["SetTime"],
      }),
      updateSetTime: builder.mutation<TSetTimeAdd, Partial<TSetTimeAdd>>({
        query: (setTime) => {
          return {
            url: `/settime/${setTime.id}`,
            method: "PUT",
            body: setTime,
          };
        },
        invalidatesTags: ["SetTime"],
      }),
      removeSetTime: builder.mutation<TSetTimeAdd, number>({
        query: (id) => {
          return {
            url: `/settime/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["SetTime"],
      }),
    };
  },
});

export const {
  useSetTimeQuery,
  useSetTimeByIdQuery,
  useCreateSetTimeMutation,
  useUpdateSetTimeMutation,
  useRemoveSetTimeMutation,
} = setTimeApi;
export const setTimeReducer = setTimeApi.reducer;
export default setTimeApi;
