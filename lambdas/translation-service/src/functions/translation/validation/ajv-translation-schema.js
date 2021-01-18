export const schema = {
  definitions: {},
  $schema: 'http://json-schema.org/draft-06/schema#',
  type: 'object',
  title: 'Translation POST Schema',
  required: ['data'],
  additionalProperties: false,
  properties: {
    data: {
      type: 'string',
      title: 'data',
      pattern: '^[a-zA-Z0-9<>/]+$',
    },
  },
  errorMessage: {
    properties: {
      data: 'data property is invalid.',
    },
    required: {
      data: 'data property is required.',
    },
  },
};
