import { getToken } from '../get-token';
import jsonWebToken from 'jsonwebtoken';
import mockDate from 'mockdate';

const signSpy = jest.spyOn(jsonWebToken, 'sign');

let event;

beforeEach(() => {
  mockDate.set('01/01/1990');
  event = { correlationId: 'correlation-id' };
});

describe('getToken handler', () => {
  it('should return a signed jwt token', async () => {
    const result = await getToken(event);
    expect(result).toEqual(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiYWE2YjgwOS1mNzQ4LTQxODMtODJhNC04OWY4OTQ4NTMwMDQiLCJlbWFpbCI6InRlc3RlckBqd3QtYnNhLmNvLnVrIiwiaWF0Ijo2MzExNTIwMDAsImV4cCI6NjMxMjM4NDAwLCJhdWQiOiJic2EvY2xpZW50IiwiaXNzIjoiYnNhL2F1dGgiLCJzdWIiOiJiYWE2YjgwOS1mNzQ4LTQxODMtODJhNC04OWY4OTQ4NTMwMDQifQ.SuVJcUL8iwvZl_10R2Eawzw6-Qg1v9zj7XCN6H4QX9I'
    );
  });

  it('should call jsonwebstoken sign with the correct params', async () => {
    await getToken(event);

    expect(signSpy).toHaveBeenCalledWith(
      {
        email: 'tester@jwt-bsa.co.uk',
        userId: 'baa6b809-f748-4183-82a4-89f894853004',
      },
      'bsasecret',
      {
        algorithm: 'HS256',
        audience: 'bsa/client',
        expiresIn: 86400,
        issuer: 'bsa/auth',
        subject: 'baa6b809-f748-4183-82a4-89f894853004',
      }
    );
  });
});
