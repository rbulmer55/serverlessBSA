# @bsa/schema-validator library

> Universal schema validator package using Ajv: Another JSON Schema Validator

[https://www.npmjs.com/package/ajv](https://www.npmjs.com/package/ajv)

## validate

The **validate** method checks the document against an extended JSON Schema. Extended with the package ajv-errors that provides custom error messages for failed validation.

```javascript
import { validate } from '@bsa/schema-validator';
import { schema } from './validation/ajv-translation-schema'; // some json schema

validate(schema, payloadBody);
```
