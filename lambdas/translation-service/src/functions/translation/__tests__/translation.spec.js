import { translation } from '../translation';
import xml2js from 'xml2js';

const parseSpy = jest.spyOn(xml2js, 'parseStringPromise');

let event;

beforeEach(() => {
  parseSpy.mockClear();

  event = { data: '<test>hello</test>', correlationId: 'correlation-id' };
});

describe('translation handler', () => {
  it('should return with the JSON translated from xml', async () => {
    const result = await translation(event);
    expect(result).toEqual({ test: 'hello' });
  });

  it('should call parse string promise with the correct params', async () => {
    await translation(event);
    expect(parseSpy).toHaveBeenCalledWith('<test>hello</test>');
  });
});
