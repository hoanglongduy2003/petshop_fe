import * as yup from "yup";

export const OrderAdminSchema = yup.object().shape({
  id: yup.number(),
  userId: yup.number(),
  userName: yup.string(),
  time: yup.string(),
  products: yup.array().of(
    yup.object().shape({
      id: yup.number(),
      name: yup.string(),
      img: yup.string(),
      price: yup.number(),
      quantity: yup.number(),
    })
  ),
  address: yup.object().shape({
    id: yup.number(),
    name: yup.string(),
    address: yup.string(),
    phone: yup.number(),
  }),
  paymentMethods: yup.object().shape({
    id: yup.number(),
    name: yup.string(),
  }),
  status: yup.object().shape({
    id: yup.number(),
    name: yup.string(),
  }),
  statusPayment: yup.object().shape({
    id: yup.number(),
    name: yup.string(),
  }),
  total: yup.number(),
  note: yup.number(),
});
export const OrderAdminSchemaRq = yup
  .array()
  .of(
    yup
      .object()
      .shape({
        id: yup.number().required(),
        userId: yup.number().required(),
        userName: yup.string().required(),
        time: yup.string().required(),
        products: yup
          .array()
          .of(
            yup.object().shape({
              id: yup.number().required(),
              name: yup.string().required(),
              img: yup.string().required(),
              price: yup.number().required(),
              quantity: yup.number().required(),
              review_id: yup.number().nullable(),
            })
          )
          .required(),
        address: yup
          .object()
          .shape({
            id: yup.number(),
            name: yup.string(),
            address: yup.string(),
            phone: yup.number(),
          })
          .required(),
        paymentMethods: yup
          .object()
          .shape({
            id: yup.number(),
            name: yup.string(),
          })
          .required(),
        status: yup
          .object()
          .shape({
            id: yup.number(),
            name: yup.string(),
          })
          .required(),
        statusPayment: yup
          .object()
          .shape({
            id: yup.number().required(),
            name: yup.string().required(),
          })
          .required(),
        total: yup.number().required(),
        note: yup.number().required(),
      })
      .required()
  )
  .required();
export type TOrderAdminSchema = yup.InferType<typeof OrderAdminSchema>;
export type TOrderAdminSchemaRq = yup.InferType<typeof OrderAdminSchemaRq>;
