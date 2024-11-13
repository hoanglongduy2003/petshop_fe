import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductResponseSchema, TProduct, TSearchProduct } from "../schema/products";

const ProductsApi = createApi({
  reducerPath: "products",
  tagTypes: ["Products"],
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
      getAllProducts: builder.query<TProduct[], void>({
        query: () => {
          return {
            url: "/products",
            method: "GET",
          };
        },
        providesTags: ["Products"],
      }),
      getTop8Products: builder.query<TProduct[], void>({
        query: () => {
          return {
            url: "/productsTop8",
            method: "GET",
          };
        },
        providesTags: ["Products"],
      }),
      getProductCate: builder.query<TProduct[], number>({
        query: (category_id) => {
          return {
            url: `/productCate/${category_id}`,
            method: "GET",
          };
        },
        providesTags: ["Products"],
      }),
      getProductById: builder.query<TProduct, number>({
        query: (id) => {
          return {
            url: `/product/${id}`,
            method: "GET",
          };
        },
        providesTags: ["Products"],
      }),
      updateProduct: builder.mutation<TProduct[], TProduct>({
        query: (products) => {
          return {
            url: `/product/${products.id}`,
            method: "PUT",
            body: products,
          };
        },
        invalidatesTags: ["Products"],
      }),
      createProducts: builder.mutation<
        ProductResponseSchema,
        Partial<TProduct>
      >({
        query: (products) => ({
          url: "/products",
          method: "POST",
          body: products,
        }),
        invalidatesTags: ["Products"],
      }),
      removeProduct: builder.mutation<TProduct, number>({
        query: (id) => {
          return {
            url: `/product/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Products"],
      }),
      searchAddProduct: builder.mutation<TProduct, TSearchProduct>({
        query: (product) => {
          return {
            url: "/searchProductsAdmin",
            method: "POST",
            body: product,
          };
        },
        invalidatesTags: ["Products"],
      }),
    };
  },
});

export const {
  useGetAllProductsQuery,
  useGetTop8ProductsQuery,
  useGetProductCateQuery,
  useCreateProductsMutation,
  useRemoveProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useSearchAddProductMutation,
} = ProductsApi;
export const productsReducer = ProductsApi.reducer;
export default ProductsApi;
