# serverless-playground
Testing out serverless framework

Steps

Front-end: Nextjs app (react and redux)

- use cognito js SDK to establish authentication

Back-end

Require:
- Default IAM Role

- Cognito will create token base on IAM role assigned
- API Gateway is accessible base on cognito role
- API Gateway triggers Lambda functions
- Lambda function querys DynamoDB


Authentication

- Google, Facebook, Amazon, Custom
- Custom requires storing user/pass

