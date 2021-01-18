import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';
import { BadRequest } from '@bsa/errors';

const ajv = new Ajv({ allErrors: true });

ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));
ajvErrors(ajv);

export function validate(
  schema: object,
  document: object,
  showProps: boolean = true
): Error | void {
  ajv.validate(schema, document);

  const { errors } = ajv;

  if (errors) {
    const details = errors.map((error) =>
      showProps
        ? `property: '${error.dataPath}' error: ${error.message}`
        : `error: ${error.message}`
    );

    const message = 'The request was invalid.';
    throw new BadRequest(message, details);
  }

  return null;
}
