import 'dotenv/config'
import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: `${process.env.CONTENT_URL}/wp/graphql`,
  generates: {
    'src/data/graphql.ts': {
      plugins: ['typescript'],
    },
  },
}

export default config
