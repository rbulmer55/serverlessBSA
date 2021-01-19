# serverlessBSA

use command 'serverless package' to build the serverless config.

use command 'serverless deploy' to deploy the project into the aws cloud (must have aws credentials set up using SSH on your machine)

This project deploys a Lambda function and a IAM role to AWS, along with and API Gateway POST endpoint with request validation.

## Translation Lambda

Payload to the API Gateway endpoint (POST) needs to be JSON containing a "data" object with a string of XML data. I.e.

```
{
    "data": "<test>Hello 123</test>"
}
```

The lambda translates the XML to a JSON object so that it can be used to hit a common API. The result of the above would be:

```
{
    test: "Hello 123"
}
```

## Get Token Lambda

Generates a JWT token to authorise the party making requests to the translation lambda.

Uses HSA256 and secret of 'bsasecret' which needs replacing with a private key or more secure and private secret if this was to go out of development.

## Lambda Authoriser

Used by attaching this function to the API gateway endpoints for all requests that need authorising on the API. This custom lambda authoriser verifies and decodes the token to check that the token is valid.

[https://www.npmjs.com/package/jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
[https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html)
[https://www.serverless.com/framework/docs/providers/aws/events/apigateway/#http-endpoints-with-custom-authorizers](https://www.serverless.com/framework/docs/providers/aws/events/apigateway/#http-endpoints-with-custom-authorizers)
