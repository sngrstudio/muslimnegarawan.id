import type { RootQuery } from 'gql-type'
import { fetchQuery, type FetchQueryResult } from './fetch'

type GetPosts = FetchQueryResult<Required<Pick<RootQuery, 'posts'>>>
type GetPost = FetchQueryResult<Required<Pick<RootQuery, 'post'>>>

export const getPosts = async (first: number | undefined) =>
  (await fetchQuery({ queryId: 'posts', variables: { first } })) as GetPosts

export const getPost = async (id: string) =>
  (await fetchQuery({ queryId: 'post', variables: { id } })) as GetPost
