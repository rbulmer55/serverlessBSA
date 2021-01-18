import { validate } from '../index';

let schema: any;
let document: any;

describe('validate', () => {
  beforeEach(() => {
    schema = {
      type: 'object',
      required: ['foo', 'bar'],
      additionalProperties: false,
      properties: {
        nested: {
          type:'object',
          properties: {
            propOne: { type: 'string' },
          },
          required: ['propOne'],
          errorMessage: {
            properties: {
              propOne: "should have a string type property 'propOne'",
            },
            required: {
              propOne: "You must supply property 'propOne'",
            },
          },
        },
        foo: { type: 'string' },
        bar: { type: 'string' },
      },
      errorMessage: {
        properties: {
          foo: "should have a string type property 'foo'",
          bar: "should have a string type property 'bar'",
        },
        required: {
          foo: "You must supply property 'foo'",
          bar: "You must supply property 'bar'",
        },
      },
    };

    document = {
      foo: 'foo',
      bar: 'bar',
      nested: {
        propOne: 'someText',
      },
    };
  });

  it('should return null on success', () => {
    const result = validate(schema, document);

    expect(result).toEqual(null);
  });

  it('should return the correct values on error when showProps is true', () => {
    delete document.foo; // required prop
    document.foobar = 'foobar'; // additional prop
    document.bar = {}; // invalid type
    document.nested.propOne = {}; // invalid nested prop type

    try {
      validate(schema, document);
    } catch (error) {
      expect(error.message).toMatchInlineSnapshot(
        `"{\\"message\\":\\"The request was invalid.\\",\\"details\\":[\\"property: '' error: should NOT have additional properties\\",\\"property: '/nested/propOne' error: should have a string type property 'propOne'\\",\\"property: '' error: You must supply property 'foo'\\",\\"property: '/bar' error: should have a string type property 'bar'\\"],\\"name\\":\\"BadRequest\\"}"`
      );
    }
  });

  it('should return the correct values on error when showProps is false', () => {
    delete document.foo; // required prop
    document.foobar = 'foobar'; // additional prop
    document.bar = {}; // invalid type
    document.nested.propOne = {}; // invalid nested prop type

    try {
      validate(schema, document, false);
    } catch (error) {
      expect(error.message).toMatchInlineSnapshot(
        `"{\\"message\\":\\"The request was invalid.\\",\\"details\\":[\\"error: should NOT have additional properties\\",\\"error: should have a string type property 'propOne'\\",\\"error: You must supply property 'foo'\\",\\"error: should have a string type property 'bar'\\"],\\"name\\":\\"BadRequest\\"}"`
      );
    }
  });
});
