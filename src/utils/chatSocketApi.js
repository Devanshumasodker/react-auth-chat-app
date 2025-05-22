// src/utils/chatSocketApi.js
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseWsQuery } from './wsBaseQuery';

export const chatSocketApi = createApi({
  reducerPath: 'chatSocketApi',
  baseQuery: baseWsQuery({
    url: 'wss://echo.websocket.org/.ws',
  }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      queryFn: async (message, _queryApi, _extraOptions, ws) => {
        ws.send(message);
        return { data: message };
      },
    }),
  }),
});

export const { useSendMessageMutation } = chatSocketApi;
