import { handler } from '../translation';

let event;

beforeEach(() => {
  event = {data:'<test><test>'};
});

describe('translation handler', () => {
  it('should return with status code 200', async () => {
    const result = await handler(event);
    expect(result.statusCode).toEqual(200);
  });
});
