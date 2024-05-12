import type { RootQuery } from './graphql'
import { fetchQuery } from './fetch'

export const getPost = async (id: string) =>
  (await fetchQuery({ queryId: 'post', variables: { id } })) as {
    data: Required<Pick<RootQuery, 'post'>>
  }
