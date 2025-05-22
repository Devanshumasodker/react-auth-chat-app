import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com',
  }),
  endpoints: (builder) => ({
    // Existing login mutation
    login: builder.mutation({
      query: ({ username, password }) => ({
        url: '/auth/login',
        method: 'POST',
        body: { username, password },
      }),
    }),
    // New posts query for infinite scroll feed
    getPosts: builder.query({
      query: ({ limit = 10, skip = 0 }) => `/posts?limit=${limit}&skip=${skip}`,
    }),
  }),
});

export const { useLoginMutation, useGetPostsQuery } = authApi;
