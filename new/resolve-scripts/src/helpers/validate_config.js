import { validate } from 'jsonschema'

import schema from '../constants/schema.config.js'

export default function validateConfig(config) {
  return validate(config, schema, { throwError: true })
}
