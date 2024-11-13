import * as yup from "yup";

export const dashboardSchema = yup.object().shape({
  total_appointments: yup.number(),
  total_revenue: yup.string().nullable(),
  month: yup.number(),
  year: yup.number(),
});

export type TDashboard = yup.InferType<typeof dashboardSchema>;