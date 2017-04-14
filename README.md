# serverless-playground

Front-end: React app

- use cognito js SDK to establish authentication

Back-end

Require:
- Default IAM Role

- Cognito will create token base on IAM role assigned
- API Gateway is accessible base on cognito role
- API Gateway triggers Lambda functions
- Lambda function querys DynamoDB


Resource

https://medium.com/@omgwtfmarc/deploying-create-react-app-to-s3-or-cloudfront-48dae4ce0af
https://blog.jpterry.com/howto/2016/02/02/secure-static-hosting-w-s3-cloudfront-acm.html
