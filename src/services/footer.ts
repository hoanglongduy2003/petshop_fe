import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FooterResponseSchema, TFooter } from "../schema/footer";

const FooterApi = createApi({
  reducerPath: "footer",
  tagTypes: ["Footer"],
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
      getAllFooter: builder.query<TFooter[], void>({
        query: () => {
          return {
            url: "/footer",
            method: "GET",
          };
        },
        providesTags: ["Footer"],
      }),
      getFooterById: builder.query<TFooter, number>({
        query: (id) => {
          return {
            url: `/footer/${id}`,
            method: "GET",
          };
        },
        providesTags: ["Footer"],
      }),
      updateFooter: builder.mutation<TFooter[], Partial<TFooter>>({
        query: (footer) => {
          return {
            url: `/editFooter`,
            method: "PATCH",
            body: footer,
          };
        },
        invalidatesTags: ["Footer"],
      }),
      createFooter: builder.mutation<FooterResponseSchema, Partial<TFooter>>({
        query: (footer) => ({
          url: "/footer",
          method: "POST",
          body: footer,
        }),
        invalidatesTags: ["Footer"],
      }),
      removeFooter: builder.mutation<TFooter, number>({
        query: (id) => {
          return {
            url: `/footer/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Footer"],
      }),
    };
  },
});

export const {
  useGetAllFooterQuery,
  useCreateFooterMutation,
  useRemoveFooterMutation,
  useGetFooterByIdQuery,
  useUpdateFooterMutation,
} = FooterApi;
export const footerReducer = FooterApi.reducer;
export default FooterApi;
