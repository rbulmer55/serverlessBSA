import translation from '../translation';

let event;

beforeEach(() => {
  event = {};
});

describe('translation handler', () => {
  it('should return with status code 200', async () => {
    const result = await translation(event);
    expect(result.statusCode).toEqual(200);
  });
});
