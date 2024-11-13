import * as yup from "yup";

export const AppointmentSchema = yup.object().shape({
  id: yup.number(),
  day: yup.string(),
  user_id: yup.number(),
  user_email: yup.string(),
  user_name: yup.string(),
  pethouse_name: yup.string(),
  pethouse_id: yup.number(),
  settime_name: yup.string(),
  status_name: yup.string(),
  start_time: yup.string(),
  status_id: yup.number(),
  end_time: yup.string(),
  total: yup.number(),
  statusPaymentName: yup.number(),
  statusPaymentId: yup.number(),
  paymentMethods_id: yup.number(),
  services: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.number().required(),
        name: yup.string().required(),
      })
    )
    .required(),
  pets: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.number().required(),
        name: yup.string().required(),
      })
    )
    .required(),
});

export const AppointmentUpdateSchema = yup
  .object()
  .shape({
    id: yup.number(),
    pethouse_id: yup.number(),
    start_time: yup.string(),
    end_time: yup.string(),
    total: yup.number(),
    services: yup
      .array()
      .of(
        yup.object().shape({
          id: yup.number().required(),
          name: yup.string().required(),
        })
      )
      .required(),
    pets: yup
      .array()
      .of(
        yup.object().shape({
          id: yup.number().required(),
          name: yup.string().required(),
        })
      )
      .required(),
  })
  .required();
export const AppointmentSchemaRes = yup.object().shape({
  id: yup.number(),
  day: yup.string(),
  user_email: yup.string(),
  user_name: yup.string(),
  pethouse_name: yup.string(),
  pethouse_id: yup.number(),
  settime_name: yup.string(),
  status_name: yup.string(),
  start_time: yup.string(),
  end_time: yup.string(),
  total: yup.number(),
  services: yup.array().of(
    yup.object().shape({
      id: yup.number(),
      name: yup.string(),
    })
  ),
  pets: yup.array().of(
    yup.object().shape({
      id: yup.number(),
      name: yup.string(),
    })
  ),
  status_id: yup.number(),
});
export const AppointmentRequestSchema = yup.object().shape({
  id: yup.number(),
  day: yup.string(),
  pet_id: yup.number(),
  services_id: yup.number(),
  user_id: yup.number(),
  pethouse_id: yup.number(),
  time_id: yup.number(),
  status_id: yup.number(),
});
export const searchAppointmentSchema = yup.object().shape({
  services_id: yup.number(),
  nameUser: yup.number(),
  pethouse_id: yup.number(),
  status_id: yup.number(),
});
export const AppointmentResponseSchema = yup.object().shape({
  id: yup.number(),
  message: yup.string(),
});

export const AppointmentErrorSchema = yup.object({});

export type TAppointment = yup.InferType<typeof AppointmentSchema>;
export type TAppointmentUpdateSchema = yup.InferType<
  typeof AppointmentUpdateSchema
>;

export type TSearchAppointment = yup.InferType<typeof searchAppointmentSchema>;

export type TAppointmentSchemaRes = yup.InferType<typeof AppointmentSchemaRes>;

export type AppointmentResponse = yup.InferType<
  typeof AppointmentResponseSchema
>;

export type AppointmentError = yup.InferType<typeof AppointmentErrorSchema>;

export const updateStatusAppointmentSchema = yup.object().shape({
  id: yup.number().required(),
  status_id: yup.number().required(),
});

export type TAupdateStatusAppointment = yup.InferType<
  typeof updateStatusAppointmentSchema
>;

export const updatePaymentAppointmentSchema = yup.object().shape({
  id: yup.number().required(),
  status_payment: yup.number().required(),
});

export type TAupdatePaymentAppointment = yup.InferType<
  typeof updatePaymentAppointmentSchema
>;

export const createAppointmentSchema = yup.object().shape({
  day: yup.string().required(),
  pet: yup.array().of(yup.number()),
  services: yup.array().of(yup.number()),
  user_id: yup.number(),
  pethouse_id: yup.number().required(),
  start_time: yup.string().required(),
  end_time: yup.string().required(),
  total: yup.number(),
  status_id: yup.number().required(),
  paymentMethods_id: yup.number().required(),
});

export const createAppointmentAdminSchema = yup.object().shape({
  day: yup.string().required(),
  pet: yup.array().of(yup.number()),
  services: yup.array().of(yup.number()),
  user_id: yup.number(),
  pethouse_id: yup.number().required(),
  start_time: yup.string().required(),
  end_time: yup.string().required(),
  total: yup.number(),
  status_id: yup.number().required(),
  status_payment: yup.number().required(),
});

export type TCreateAppointment = yup.InferType<typeof createAppointmentSchema>;
export type TCreateAppointmentAdmin = yup.InferType<
  typeof createAppointmentAdminSchema
>;

export const cancelHistoryAppointmentSchema = yup.object().shape({
  id: yup.number().required(),
});

export type TCancelHistoryAppointment = yup.InferType<
  typeof cancelHistoryAppointmentSchema
>;

export const getAppointmentRequestTimeSchema = yup.object().shape({
  pethouse_id: yup.number().required(),
});

export type TGetAppointmentTimeRequest = yup.InferType<
  typeof getAppointmentRequestTimeSchema
>;

export const getAppointmentTimeSchema = yup.object().shape({
  id: yup.number().required(),
  start_time: yup.string().required(),
  end_time: yup.string().required(),
});

export type TGetAppointmentTime = yup.InferType<
  typeof getAppointmentTimeSchema
>;

export const GetStatusPaymentSchema = yup.object().shape({
  status_payment: yup.number(),
});

export type TGetStatusPaymentSchema = yup.InferType<
  typeof GetStatusPaymentSchema
>;
