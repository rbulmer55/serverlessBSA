import { translationRest } from '../translation-rest';
import { translation } from '../translation';

jest.mock('../translation');

let event;

beforeEach(() => {
  translation.mockClear();

  event = {
    requestContext: {
      requestId: 'correlation-id',
    },
    body: JSON.stringify({
      data: '<test>hello</test>',
    }),
  };
});

describe('translation-rest', () => {
  it('should catch and return error if thrown', async () => {
    translation.mockRejectedValueOnce('error');

    const result = await translationRest(event);
    expect(result).toEqual({
      body: '{"message":"An internal error occurred. Please try again later"}',
      statusCode: 500,
    });
  });

  it('should return the correct result', async () => {
    const result = await translationRest(event);
    expect(result).toEqual({
      body: '{"message":"Hello translation lambda"}',
      statusCode: 200,
    });
  });

  it('should call translation with the correct params', async () => {
    await translationRest(event);
    expect(translation).toHaveBeenCalledWith({
      correlationId: 'correlation-id',
      data: '<test>hello</test>',
    });
  });
});
