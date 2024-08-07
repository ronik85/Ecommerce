import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MessageResponse, UserResponse } from "../../types/api-types";
import { User } from "../../types/types";
import axios from "axios";


export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/` }),
    endpoints: (builder) => ({
        login: builder.mutation<MessageResponse, User>({
            query: (user) => ({
                url: "create",
                method: "POST",
                body: user
            })
        }),

        lol: builder.query({ query: () => "new2" })
    })
})

export const getUser = async (id: string) => {
    try {
        const { data }: { data: UserResponse } = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/user/${id}`)
        return data
    } catch (error) {
        throw error
    }
}

export const { useLoginMutation } = userApi