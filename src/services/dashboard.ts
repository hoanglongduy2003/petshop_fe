import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TDashboard } from "../schema/dashboard";

const dashboardApi = createApi({
  reducerPath: "dashboard",
  tagTypes: ["Dashboard"],
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
      list: builder.query<TDashboard[], void>({
        query: () => {
          return {
            url: "/dashboard",
            method: "GET",
          };
        },
        providesTags: ["Dashboard"],
      }),
      revenueToday: builder.query<any, void>({
        query: () => {
          return {
            url: "/getRevenueToday",
            method: "GET",
          };
        },
        providesTags: ["Dashboard"],
      }),
      getCountUserDay: builder.query<any, void>({
        query: () => {
          return {
            url: "/getCountUserDay",
            method: "GET",
          };
        },
        providesTags: ["Dashboard"],
      }),
      revenueThisMonth: builder.query<any, void>({
        query: () => {
          return {
            url: "/getRevenueThisMonth",
            method: "GET",
          };
        },
        providesTags: ["Dashboard"],
      }),
      total: builder.query<any[], void>({
        query: () => {
          return {
            url: "/dashboardTotal",
            method: "GET",
          };
        },
        providesTags: ["Dashboard"],
      }),
      totalRevenue: builder.query<any[], void>({
        query: () => {
          return {
            url: "/totalRevenue",
            method: "GET",
          };
        },
        providesTags: ["Dashboard"],
      }),

      // Appointments

      revenueAppointmentsThisMonth: builder.query<any[], void>({
        query: () => {
          return {
            url: "/getRevenueAppointmentsThisMonth",
            method: "GET",
          };
        },
        providesTags: ["Dashboard"],
      }),
      revenueAppointmentsDay: builder.query<any[], void>({
        query: () => {
          return {
            url: "/getRevenueAppointmentsDay",
            method: "GET",
          };
        },
        providesTags: ["Dashboard"],
      }),
      scheduleStatusAppointment: builder.query<any[], void>({
        query: () => {
          return {
            url: "/getSCheduleStatusAppointment",
            method: "GET",
          };
        },
        providesTags: ["Dashboard"],
      }),
      // Appointments

      //order
      scheduleStatusOrder: builder.query<any[], void>({
        query: () => {
          return {
            url: "/sCheduleStatusOrder",
            method: "GET",
          };
        },
        providesTags: ["Dashboard"],
      }),
      //order

    };
  },
});

export const {
  useScheduleStatusAppointmentQuery,
  useScheduleStatusOrderQuery,
  useRevenueAppointmentsThisMonthQuery,
  useRevenueAppointmentsDayQuery,
  useListQuery,
  useTotalRevenueQuery,
  useTotalQuery,
  useRevenueTodayQuery,
  useRevenueThisMonthQuery,
  useGetCountUserDayQuery,
} = dashboardApi;
export const dashboardReducer = dashboardApi.reducer;
export default dashboardApi;
