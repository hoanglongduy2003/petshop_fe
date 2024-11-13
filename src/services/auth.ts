import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  TRegisterAccount,
  TRegisterAccountRequest,
} from "../schema/registerAccount";
import { SignInResponse, TSignIn } from "../schema/signIn";
import { TResetPass } from "../schema/resetPassword";

const authApi = createApi({
  reducerPath: "auth",
  tagTypes: ["Auth"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  endpoints(builder) {
    return {
      registerUser: builder.mutation<
        TRegisterAccountRequest,
        Partial<TRegisterAccount>
      >({
        query: (user) => {
          return {
            url: "/register",
            method: "POST",
            body: user,
          };
        },
      }),
      loginUser: builder.mutation<SignInResponse, Partial<TSignIn>>({
        query: (user) => {
          return {
            url: "/login",
            method: "POST",
            body: user,
          };
        },
      }),
      emailPasswordUser: builder.mutation<TResetPass, Partial<TResetPass>>({
        query: (user) => {
          return {
            url: "/forgotPassword",
            method: "POST",
            body: user,
          };
        },
      }),
    };
  },
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useEmailPasswordUserMutation,
} = authApi;
export const authReducer = authApi.reducer;
export default authApi;
