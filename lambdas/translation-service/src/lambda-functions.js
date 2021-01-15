module.exports = {
  TestTranslation: {
    handler: 'src/functions/translation/translation.handler',
    role: {
      'Fn::GetAtt': ['LambdaHandlerServiceRole', 'Arn'],
    },
    environment: {},
    memorySize: 512,
    timeout: 10,
    events: [
      {
        http: {
          path: 'translation/translate/',
          method: 'get',
          // authorizer: {
          //   name: 'Authoriser',
          //   identitySource: 'method.request.header.Authorization',
          //   type: 'token',
          //   resultTtlInSeconds: 30,
          // },
          // request: {
          //   parameters: {
          //     headers: {
          //       Authorization: true,
          //     },
          //   },
          // },
        },
      },
    ],
    tags: {
      APP: 'SERVERLESS_BSA',
      STAGE: '${self:provider.stage}',
    },
  },
};
