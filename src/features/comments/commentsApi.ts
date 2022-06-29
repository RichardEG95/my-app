import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import Environ from '../../common/Environ';
import { IComment } from './entities';

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({baseUrl: `${Environ.baseUrl}/comments`}),
  tagTypes: ['Comments'],
  endpoints: builder => ({
    getComments: builder.query<IComment[], void>({
      query: () => '',
      providesTags: ['Comments']
    }),
    addComment: builder.mutation<IComment, Omit<IComment, 'id'>>({
      query: body => ({
        url: '',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Comments']
    }),
    removeComment: builder.mutation<number, number>({
      query: commentId => ({
        url: `/${commentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comments']
    }),
    editComment: builder.mutation<number, IComment>({
      query: body => ({
        url: `/${body.id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Comments']
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useRemoveCommentMutation,
  useEditCommentMutation
} = commentsApi;
