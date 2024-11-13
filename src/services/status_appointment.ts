import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TStatus } from "../schema/status";

const statusApi = createApi({
  reducerPath: "status",
  tagTypes: ["Status"],
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
      status: builder.query<TStatus[], void>({
        query: () => {
          return {
            url: "/status_appointment",
            method: "GET",
          };
        },
        providesTags: ["Status"],
      }),
      statusPayment: builder.query<TStatus[], void>({
        query: () => {
          return {
            url: "/status_payment_appointment",
            method: "GET",
          };
        },
        providesTags: ["Status"],
      }),
      getStatusById: builder.query<TStatus, number>({
        query: (status) => {
          return {
            url: `/status_appointment/${status}`,
            method: "GET",
          };
        },
        providesTags: ["Status"],
      }),

      createStatus: builder.mutation<TStatus[], Partial<TStatus>>({
        query: (statusData) => ({
          url: "/status_appointment",
          method: "POST",
          body: statusData,
        }),
        invalidatesTags: ["Status"],
      }),

      updateStatus: builder.mutation<TStatus, TStatus>({
        query: (status) => ({
          url: `/status_appointment/${status.id}`,
          method: "PUT",
          body: status,
        }),
        invalidatesTags: ["Status"],
      }),
      removeStatusAppointment: builder.mutation<TStatus, number>({
        query: (id) => ({
          url: `/status_appointment/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Status"],
      }),
    };
  },
});

export const {
  useStatusQuery,
  useStatusPaymentQuery,
  useCreateStatusMutation,
  useUpdateStatusMutation,
  useGetStatusByIdQuery,
  useRemoveStatusAppointmentMutation,
} = statusApi;
export const statusReducer = statusApi.reducer;
export default statusApi;
