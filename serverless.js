const tsLambdas = require('./lambdas/translation-service/src/lambda-functions');
const tsResources = require('./lambdas/translation-service/src/resources');

const authLambdas = require('./lambdas/auth-service/src/lambda-functions');

module.exports = {
  service: 'serverless-bsa-lambdas',
  package: {
    individually: true,
    // excludeDevDependencies: false,
    // exclude: ['node_modules/**'],
  },
  // serverless configuration values
  provider: {
    name: 'aws',
    region: '${opt:region, "eu-west-1"}',
    stage: '${opt:stage, "dev"}',
    runtime: 'nodejs12.x',
    versionFunctions: false,
    environment: {
      STAGE: '${opt:stage, "dev"}',
    },
    //api-gateway endpoint type
    apiGateway: {
      shouldStartNameWithService: true,
      endpoint: 'regional',
    },
  },
  // serverless plugins
  plugins: [
    'serverless-bundle',
    //'serverless-esbuild',
  ],
  functions: {
    // lambda function configurations
    ...tsLambdas,
    ...authLambdas,
  },
  custom: {
    // custom default variables
    prefix: '${self:service}',
    // serverless bundle config
    bundle: {
      caching: true,
      sourcemaps: false,
    },
    // serverless esbuild config
    // esbuild: {
    //   bundle: true,
    //   minify: false,
    // },
  },
  resources: {
    // additional resource properties
    Resources: {
      ...tsResources,
    },
  },
};
