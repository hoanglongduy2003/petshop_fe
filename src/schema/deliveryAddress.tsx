import * as yup from "yup";

export const deliveryAddressSchema = yup.object().shape({
  id: yup.number(),
  name: yup.string(),
  phone: yup.number(),
  address: yup.string(),
  city: yup.string(),
  district: yup.string(),
  ward: yup.string(),
  user_Id: yup.number(),
  is_delete: yup.boolean(),
});

export type TDeliveryAddress = yup.InferType<typeof deliveryAddressSchema>;
