import { lambdaAuthoriser } from '../lambda-authoriser';
import jsonWebToken from 'jsonwebtoken';
import mockDate from 'mockdate';

const verifySpy = jest.spyOn(jsonWebToken, 'verify');

let event;

beforeEach(() => {
  event = {
    authorizationToken:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiYWE2YjgwOS1mNzQ4LTQxODMtODJhNC04OWY4OTQ4NTMwMDQiLCJlbWFpbCI6InRlc3RlckBqd3QtYnNhLmNvLnVrIiwiaWF0Ijo2MzExNTIwMDAsImV4cCI6NjMxMjM4NDAwLCJhdWQiOiJic2EvY2xpZW50IiwiaXNzIjoiYnNhL2F1dGgiLCJzdWIiOiJiYWE2YjgwOS1mNzQ4LTQxODMtODJhNC04OWY4OTQ4NTMwMDQifQ.SuVJcUL8iwvZl_10R2Eawzw6-Qg1v9zj7XCN6H4QX9I',
  };

  mockDate.set('01/01/1990');
  verifySpy.mockClear();
});

describe('lambda-authoriser', () => {
  it('should call jsonwebtoken verify with the correct params', async () => {
    await lambdaAuthoriser(event);
    expect(
      verifySpy
    ).toHaveBeenCalledWith(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiYWE2YjgwOS1mNzQ4LTQxODMtODJhNC04OWY4OTQ4NTMwMDQiLCJlbWFpbCI6InRlc3RlckBqd3QtYnNhLmNvLnVrIiwiaWF0Ijo2MzExNTIwMDAsImV4cCI6NjMxMjM4NDAwLCJhdWQiOiJic2EvY2xpZW50IiwiaXNzIjoiYnNhL2F1dGgiLCJzdWIiOiJiYWE2YjgwOS1mNzQ4LTQxODMtODJhNC04OWY4OTQ4NTMwMDQifQ.SuVJcUL8iwvZl_10R2Eawzw6-Qg1v9zj7XCN6H4QX9I',
      'bsasecret',
      { algorithm: 'HS256' }
    );
  });

  it('should return a policy with access if verified', async () => {
    const result = await lambdaAuthoriser(event);

    expect(result).toEqual({
      context: {
        aud: 'bsa/client',
        email: 'tester@jwt-bsa.co.uk',
        iss: 'bsa/auth',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiYWE2YjgwOS1mNzQ4LTQxODMtODJhNC04OWY4OTQ4NTMwMDQiLCJlbWFpbCI6InRlc3RlckBqd3QtYnNhLmNvLnVrIiwiaWF0Ijo2MzExNTIwMDAsImV4cCI6NjMxMjM4NDAwLCJhdWQiOiJic2EvY2xpZW50IiwiaXNzIjoiYnNhL2F1dGgiLCJzdWIiOiJiYWE2YjgwOS1mNzQ4LTQxODMtODJhNC04OWY4OTQ4NTMwMDQifQ.SuVJcUL8iwvZl_10R2Eawzw6-Qg1v9zj7XCN6H4QX9I',
        userId: 'baa6b809-f748-4183-82a4-89f894853004',
      },
      policyDocument: {
        Statement: [
          { Action: 'execute-api:Invoke', Effect: 'Allow', Resource: '*' },
        ],
        Version: '2012-10-17',
      },
      principalId: 'user',
    });
  });

  it('should return a policy with deny if not verified', async () => {
    mockDate.set('02/01/1990'); // expired token
    const result = await lambdaAuthoriser(event);

    expect(result).toEqual({
      context: { token: '' },
      policyDocument: {
        Statement: [
          { Action: 'execute-api:Invoke', Effect: 'Deny', Resource: '*' },
        ],
        Version: '2012-10-17',
      },
      principalId: 'user',
    });
  });
});
