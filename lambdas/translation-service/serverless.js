const lambdas = require('./src/lambda-functions');
const resources = require('./src/resources');

module.exports = {
  service: {
    name: 'serverless-bsa-lambdas',
  },
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
  },
  // serverless plugins
  plugins: [
    //'serverless-bundle'
    'serverless-esbuild',
  ],
  functions: {
    // lambda function configurations
    ...lambdas,
  },
  custom: {
    // custom default variables
    prefix: '${self:service}',
    // serverless bundle config
    // bundle: {
    //   caching: true,
    //   sourcemaps: false,
    // },
    // serverless esbuild config
    esbuild: {
      bundle: true,
      minify: false,
    },
  },
  resources: {
    // additional resource properties
    Resources: {
      ...resources,
    },
  },
};
