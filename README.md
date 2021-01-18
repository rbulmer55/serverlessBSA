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
