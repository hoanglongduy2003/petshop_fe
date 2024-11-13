import * as yup from "yup";

export const ProductSchema = yup.object().shape({
  id: yup.number(),
  img: yup.string(),
  name: yup.string(),
  description: yup.string(),
  price: yup.number(),
  quantity: yup.number(),
  nameCategory: yup.string(),
  category_id: yup.number(),
});

export const ProductRequestSchema = yup.object().shape({
  id: yup.number(),
  img: yup.string(),
  name: yup.string(),
  description: yup.string(),
  price: yup.number(),
  quantity: yup.number(),
  nameCategory: yup.string(),
  category_id: yup.number(),
});

export const searchProductSchema = yup.object().shape({
  services_id: yup.number(),
  nameUser: yup.number(),
  pethouse_id: yup.number(),
  status_id: yup.number(),
});

export const ProductResponseSchema = yup.object().shape({
  id: yup.number(),
  message: yup.string(),
});

export const ProductErrorSchema = yup.object({});

export type TProduct = yup.InferType<typeof ProductSchema>;

export type ProductResponseSchema = yup.InferType<typeof ProductResponseSchema>;

export type TSearchProduct = yup.InferType<typeof searchProductSchema>;


export type ProductError = yup.InferType<typeof ProductErrorSchema>;
