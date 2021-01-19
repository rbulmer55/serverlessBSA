module.exports = {
  GetToken: {
    handler:
      'lambdas/auth-service/src/functions/get-token/get-token-rest.getTokenRest',
    role: {
      'Fn::GetAtt': ['LambdaHandlerServiceRole', 'Arn'],
    },
    environment: {},
    memorySize: 128,
    timeout: 10,
    events: [
      {
        http: {
          path: 'auth/token/',
          method: 'GET',
        },
      },
    ],
    tags: {
      APP: 'SERVERLESS_BSA',
      STAGE: '${self:provider.stage}',
    },
  },
  LambdaAuthoriser: {
    handler:
      'lambdas/auth-service/src/functions/lambda-authoriser/lambda-authoriser.lambdaAuthoriser',
    role: {
      'Fn::GetAtt': ['LambdaHandlerServiceRole', 'Arn'],
    },
    environment: {},
    memorySize: 128,
    timeout: 10,
    tags: {
      APP: 'SERVERLESS_BSA',
      STAGE: '${self:provider.stage}',
    },
  },
};
