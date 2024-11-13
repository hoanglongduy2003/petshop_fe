import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TStatusContact } from "../schema/status_contact";

const statusContactApi = createApi({
  reducerPath: "status_contact",
  tagTypes: ["Status_contact"],
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
      getAllstatusContact: builder.query<TStatusContact[], void>({
        query: () => {
          return {
            url: "/status_contact",
            method: "GET",
          };
        },
        providesTags: ["Status_contact"],
      }),

      getStatusContactById: builder.query<TStatusContact, number>({
        query: (status_contact) => {
          return {
            url: `/status_contact/${status_contact}`,
            method: "GET",
          };
        },
        providesTags: ["Status_contact"],
      }),

      createStatusContact: builder.mutation<
        TStatusContact[],
        Partial<TStatusContact>
      >({
        query: (status) => ({
          url: "/status_contact",
          method: "POST",
          body: status,
        }),
        invalidatesTags: ["Status_contact"],
      }),

      updateStatusContact: builder.mutation<TStatusContact, TStatusContact>({
        query: (status) => ({
          url: `/status_contact/${status.id}`,
          method: "PUT",
          body: status,
        }),
        invalidatesTags: ["Status_contact"],
      }),
      removeStatusContact: builder.mutation<TStatusContact, number>({
        query: (id) => ({
          url: `/status_contact/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Status_contact"],
      }),
    };
  },
});

export const {
  useGetAllstatusContactQuery,
  useCreateStatusContactMutation,
  useUpdateStatusContactMutation,
  useGetStatusContactByIdQuery,
  useRemoveStatusContactMutation,
} = statusContactApi;
export const statusContactReducer = statusContactApi.reducer;
export default statusContactApi;
