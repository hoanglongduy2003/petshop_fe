import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  WebsiteInformationResponseSchema,
  TWebsiteInformation,
} from "../schema/websiteInformation";

const WebsiteInformationApi = createApi({
  reducerPath: "websiteInformation",
  tagTypes: ["WebsiteInformation"],
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
      getAllWebsiteInformation: builder.query<TWebsiteInformation[], void>({
        query: () => {
          return {
            url: "/websiteinformation",
            method: "GET",
          };
        },
        providesTags: ["WebsiteInformation"],
      }),
      getWebsiteInformationById: builder.query<TWebsiteInformation, number>({
        query: (id) => {
          return {
            url: `/websiteinformation/${id}`,
            method: "GET",
          };
        },
        providesTags: ["WebsiteInformation"],
      }),
      updateWebsiteInformation: builder.mutation<
        TWebsiteInformation[],
        Partial<TWebsiteInformation>
      >({
        query: (websiteinformation) => {
          return {
            url: `/editWebsiteInformation`,
            method: "PATCH",
            body: websiteinformation,
          };
        },
        invalidatesTags: ["WebsiteInformation"],
      }),
      createWebsiteInformation: builder.mutation<
        WebsiteInformationResponseSchema,
        Partial<TWebsiteInformation>
      >({
        query: (websiteinformation) => ({
          url: "/websiteinformation",
          method: "POST",
          body: websiteinformation,
        }),
        invalidatesTags: ["WebsiteInformation"],
      }),
      removeWebsiteInformation: builder.mutation<TWebsiteInformation, number>({
        query: (id) => {
          return {
            url: `/websiteinformation/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["WebsiteInformation"],
      }),
    };
  },
});

export const {
  useGetAllWebsiteInformationQuery,
  useCreateWebsiteInformationMutation,
  useRemoveWebsiteInformationMutation,
  useGetWebsiteInformationByIdQuery,
  useUpdateWebsiteInformationMutation,
} = WebsiteInformationApi;
export const websiteinformationReducer = WebsiteInformationApi.reducer;
export default WebsiteInformationApi;
