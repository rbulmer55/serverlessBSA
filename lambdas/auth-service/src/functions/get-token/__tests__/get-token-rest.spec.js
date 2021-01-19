import { getTokenRest } from '../get-token-rest';
import { getToken } from '../get-token';

jest.mock('../get-token');

let event;

beforeEach(() => {
  getToken.mockClear();

  getToken.mockResolvedValue('signed-token');

  event = {
    requestContext: {
      requestId: 'correlation-id',
    },
  };
});

describe('get-token-rest', () => {
  it('should catch and return error if thrown', async () => {
    getToken.mockRejectedValueOnce('error');

    const result = await getTokenRest(event);
    expect(result).toEqual({
      body: '{"message":"An internal error occurred. Please try again later"}',
      statusCode: 500,
    });
  });

  it('should return the correct result', async () => {
    const result = await getTokenRest(event);
    expect(result).toEqual({
      body: '{"message":"Hello get token lambda","token":"signed-token"}',
      statusCode: 200,
    });
  });

  it('should call translation with the correct params', async () => {
    await getTokenRest(event);
    expect(getToken).toHaveBeenCalledWith({
      correlationId: 'correlation-id',
    });
  });
});
