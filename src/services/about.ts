import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TAbout } from "../schema/about";

const aboutApi = createApi({
  reducerPath: "about",
  tagTypes: ["About"],
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
      about: builder.query<TAbout[], void>({
        query: () => {
          return {
            url: "/about",
            method: "GET",
          };
        },
        providesTags: ["About"],
      }),

      getAboutById: builder.query<TAbout, number>({
        query: (about) => {
          return {
            url: `/about/${about}`,
            method: "GET",
          };
        },
        providesTags: ["About"],
      }),
      
      addAbout: builder.mutation<TAbout[], Partial<TAbout>>({
        query: (aboutData) => ({
          url: "/about",
          method: "POST",
          body: aboutData, 
        }),
        invalidatesTags: ["About"],
      }),

      updateAbout: builder.mutation<TAbout, TAbout>({
        query: (about) => ({
            url: `/about/${about.id}`,
            method: "PUT",
            body: about,
        }),
        invalidatesTags: ["About"],
    }),

    removeAbout: builder.mutation<TAbout, number>({
      query: (id) => {
        return {
          url: `/about/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["About"],
    }),

    };
  },
});

export const { useAboutQuery, useAddAboutMutation, useUpdateAboutMutation, useGetAboutByIdQuery, useRemoveAboutMutation } = aboutApi;
export const aboutReducer = aboutApi.reducer;
export default aboutApi;
