module.exports = {
  LambdaHandlerServiceRole: {
    Type: 'AWS::IAM::Role',
    Properties: {
      RoleName: '${self:custom.prefix}-lambda-handler-lr',
      AssumeRolePolicyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: {
              Service: ['lambda.amazonaws.com'],
            },
            Action: ['sts:AssumeRole'],
          },
        ],
      },
      Policies: [
        {
          PolicyName: '${self:custom.prefix}-lambda-handler-policy',
          PolicyDocument: {
            Version: '2012-10-17',
            Statement: [
              {
                Effect: 'Allow',
                Action: ['xray:PutTraceSegments', 'xray:PutTelemetryRecords'],
                Resource: '*',
              },
              {
                Effect: 'Allow',
                Action: [
                  'logs:CreateLogGroup',
                  'logs:CreateLogStream',
                  'logs:PutLogEvents',
                ],
                Resource: '*',
              },
            ],
          },
        },
      ],
    },
  },
};
