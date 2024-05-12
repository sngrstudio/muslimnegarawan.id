import type { RootQuery } from 'gql-type'
import { fetchQuery } from './fetch'

export const getPost = async (id: string) =>
  (await fetchQuery({ queryId: 'post', variables: { id } })) as {
    data: Required<Pick<RootQuery, 'post'>>
  }
