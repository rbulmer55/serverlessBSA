module.exports = {
  TestTranslation: {
    handler:
      'lambdas/translation-service/src/functions/translation/translation-rest.translationRest',
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
          method: 'post',
          // authorizer: {
          //   name: 'Authoriser',
          //   identitySource: 'method.request.header.Authorization',
          //   type: 'token',
          //   resultTtlInSeconds: 30,
          // },
          request: {
            //   parameters: {
            //     headers: {
            //       Authorization: true,
            //     },
            //   },
            // schema: {
            //   'application/json':
            //     '${file(lambdas/translation-service/src/functions/translation/validation/translation-schema.json)}',
            // },
          },
        },
      },
    ],
    tags: {
      APP: 'SERVERLESS_BSA',
      STAGE: '${self:provider.stage}',
    },
  },
};
