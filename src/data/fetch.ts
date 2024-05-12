const GRAPHQL_ENDPOINT = `${import.meta.env.DEV ? import.meta.env.CONTENT_URL : process.env.CONTENT_URL}/wp/graphql`

export const gql = String.raw
export const fetchQuery = async ({
  query,
  queryId,
  variables,
}: {
  query?: ReturnType<typeof gql>
  queryId?: string
  variables?: Record<string, string | Array<string> | number | undefined>
}) => {
  try {
    const response = await fetch(
      [
        GRAPHQL_ENDPOINT,
        query ? `?query=${encodeURIComponent(query)}` : '',
        queryId ? `?queryId=${queryId}` : '',
        variables
          ? `&variables=${encodeURIComponent(JSON.stringify(variables))}`
          : '',
      ].join('')
    )

    const json = await response.json()
    if (json.errors) {
      json.errors.map((err: any) => {
        throw new Error(err.message)
      })
    }
    return json
  } catch (error) {
    console.error(error)
    return null
  }
}
