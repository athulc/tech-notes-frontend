import { apiSlice } from "../../app/api/apiSlice";
import { logout, setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(logout());
          dispatch(apiSlice.util.resetApiState());
        } catch (error) {
          console.error(error);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          const { accesstoken } = data;
          dispatch(setCredentials({ accesstoken }));
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRefreshMutation, useSendLogoutMutation } = authApiSlice;
