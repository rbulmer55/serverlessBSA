import { verify } from 'jsonwebtoken';

function generatePolicy(
  principalId,
  effect,
  resource,
  token = '',
  custom = {}
) {
  const authResponse = {};

  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }

  authResponse.context = {
    token,
    ...custom,
  };
  return authResponse;
}

export async function lambdaAuthoriser({ authorizationToken }) {
  if (!authorizationToken) {
    throw new Error('Unauthorised');
  }

  try {
    const token = authorizationToken.replace('Bearer ', '');

    const { userId, email, iss, aud } = verify(token, 'bsasecret', {
      algorithm: 'HS256',
    });

    return generatePolicy('user', 'Allow', '*', token, {
      userId,
      email,
      iss,
      aud,
    });
  } catch (err) {
    return generatePolicy('user', 'Deny', '*');
  }
}
