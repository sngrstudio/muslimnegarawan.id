import type { RootQuery } from 'gql-type'
import { fetchQuery } from './fetch'

export const getPosts = async (first: number | undefined) =>
  (await fetchQuery({ queryId: 'posts', variables: { first } })) as {
    data: Required<Pick<RootQuery, 'posts'>>
  }

export const getPost = async (id: string) =>
  (await fetchQuery({ queryId: 'post', variables: { id } })) as {
    data: Required<Pick<RootQuery, 'post'>>
  }
