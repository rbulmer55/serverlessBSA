module.exports = {
  TestTranslation: {
    handler: './functions/translation/translation.handler',
    role: {
      'Fn::GetAtt': ['LambdaHandlerServiceRole', 'Arn'],
    },
    environment: {},
    memorySize: 512,
    timeout: 10,
    tags: {
      APP: 'SERVERLESS_BSA',
      STAGE: '${self:provider.stage}',
    },
  },
};
