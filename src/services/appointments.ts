import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AppointmentResponse,
  TAppointment,
  TAppointmentUpdateSchema,
  TAupdatePaymentAppointment,
  TAupdateStatusAppointment,
  TCancelHistoryAppointment,
  TCreateAppointment,
  TCreateAppointmentAdmin,
  TGetAppointmentTime,
  TGetAppointmentTimeRequest,
  TGetStatusPaymentSchema,
  TSearchAppointment,
} from "../schema/appointments";

const appointmentApi = createApi({
  reducerPath: "appointment",
  tagTypes: ["Appointment"],
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
      getAllappointmentData: builder.query<TAppointment[], void>({
        query: () => {
          return {
            url: "/getAllAppointmentData",
            method: "GET",
          };
        },
        providesTags: ["Appointment"],
      }),
      getAppointmentUser: builder.query<TAppointment[], void>({
        query: () => {
          return {
            url: `/getAppointmentUser`,
            method: "GET",
          };
        },
        providesTags: ["Appointment"],
      }),
      getAppointmentUserStatus: builder.query<TAppointment[], number>({
        query: (status_id) => {
          return {
            url: `/getAppointmentUserStatus/${status_id}`,
            method: "GET",
          };
        },
        providesTags: ["Appointment"],
      }),
      showAppointment: builder.query<TAppointment[], number>({
        query: (id) => {
          return {
            url: `/appointment/${id}`,
            method: "GET",
          };
        },
        providesTags: ["Appointment"],
      }),

      showStatusPayment: builder.query<TGetStatusPaymentSchema, number>({
        query: (id) => {
          return {
            url: `/appointment/${id}/status_payment`,
            method: "GET",
          };
        },
        providesTags: ["Appointment"],
      }),
      addAppointment: builder.mutation<
        AppointmentResponse,
        Partial<TCreateAppointment>
      >({
        query: (appointments) => {
          return {
            url: "/appointment",
            method: "POST",
            body: appointments,
          };
        },
        invalidatesTags: ["Appointment"],
      }),
      checkPetHouseAppointment: builder.mutation<any, any>({
        query: (appointments) => {
          return {
            url: "/checkPetHouseAppointments",
            method: "POST",
            body: appointments,
          };
        },
        invalidatesTags: ["Appointment"],
      }),
      addAppointmentAdmin: builder.mutation<
        AppointmentResponse,
        Partial<TCreateAppointmentAdmin>
      >({
        query: (appointments) => {
          return {
            url: "/appointmentAdmin",
            method: "POST",
            body: appointments,
          };
        },
        invalidatesTags: ["Appointment"],
      }),
      searchAddAppointment: builder.mutation<TAppointment, TSearchAppointment>({
        query: (appointments) => {
          return {
            url: "/searchAppointmentsAdmin",
            method: "POST",
            body: appointments,
          };
        },
        invalidatesTags: ["Appointment"],
      }),
      updateStatusAppointment: builder.mutation<
        TAppointment,
        Partial<TAupdateStatusAppointment>
      >({
        query: (appointments) => ({
          url: `/appointmentStatus/${appointments.id}`,
          method: "PUT",
          body: appointments,
        }),
        invalidatesTags: ["Appointment"],
      }),
      updatePaymentAppointment: builder.mutation<
        TAppointment,
        Partial<TAupdatePaymentAppointment>
      >({
        query: (appointments) => ({
          url: `/appointmentPayment/${appointments.id}`,
          method: "PUT",
          body: appointments,
        }),
        invalidatesTags: ["Appointment"],
      }),
      updateAppointmentAdmin: builder.mutation<TAppointment, any>({
        query: (appointments) => ({
          url: `/updateAdmin/${appointments.id}`,
          method: "PATCH",
          body: appointments,
        }),
        invalidatesTags: ["Appointment"],
      }),
      updateAppointment: builder.mutation<
        TAppointmentUpdateSchema,
        Partial<TAppointmentUpdateSchema>
      >({
        query: (appointments) => ({
          url: `/appointment/${appointments.id}`,
          method: "PATCH",
          body: appointments,
        }),
        invalidatesTags: ["Appointment"],
      }),
      getAppointmentTime: builder.mutation<
        TGetAppointmentTime[],
        Partial<TGetAppointmentTimeRequest>
      >({
        query: (appointments) => ({
          url: `/appointmentTime`,
          method: "POST",
          body: appointments,
        }),
        invalidatesTags: ["Appointment"],
      }),
      cancelHistoryAppointment: builder.mutation<
        void,
        Partial<TCancelHistoryAppointment>
      >({
        query: (appointments) => ({
          url: `/cancelHistoryAppointment`,
          method: "PATCH",
          body: appointments,
        }),
        invalidatesTags: ["Appointment"],
      }),
      ListPaymentAppointment: builder.query<TAppointment[], number>({
        query: (id) => {
          return {
            url: `/appointmentPrintData/${id}`,
            method: "GET",
          };
        },
        providesTags: ["Appointment"],
      }),
    };
  },
});

export const {
  useGetAllappointmentDataQuery,
  useGetAppointmentUserStatusQuery,
  useShowAppointmentQuery,
  useShowStatusPaymentQuery,
  useGetAppointmentUserQuery,
  useAddAppointmentMutation,
  useSearchAddAppointmentMutation,
  useUpdateStatusAppointmentMutation,
  useUpdatePaymentAppointmentMutation,
  useUpdateAppointmentAdminMutation,
  useUpdateAppointmentMutation,
  useCancelHistoryAppointmentMutation,
  useCheckPetHouseAppointmentMutation,
  useAddAppointmentAdminMutation,
  useGetAppointmentTimeMutation,
  useListPaymentAppointmentQuery,
} = appointmentApi;
export const appointmentReducer = appointmentApi.reducer;
export default appointmentApi;
