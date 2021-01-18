import { translation } from '../translation';

let event;

beforeEach(() => {
  event = { data: '<test>hello</test>', correlationId: 'correlation-id' };
});

describe('translation handler', () => {
  it('should return with status code 200', async () => {
    const result = await translation(event);
    expect(result).toEqual({ test: 'hello' });
  });
});
