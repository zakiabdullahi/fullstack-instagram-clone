import { apiSlice } from "./baseApiSlice";

export const authApiSlice = apiSlice.injectEndpoints({

    endpoints: (builder) => ({


        login: builder.mutation({

            query: (userData) => ({

                url: "/users/login-user",
                method: "POST",
                body: userData
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/users/logout-user",
                method: 'POST',
            })
        })

    })
})

export const { useLoginMutation, useLogoutMutation } = authApiSlice