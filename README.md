# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

## Prerequisites
* aws CDK 
```
npm install -g aws-cdk
```

## Deployment (from local)
* store your credentials in home directory C:\Users\username\.aws
```
[default]
region=us-east-1
aws_access_key_id = xxxx
aws_secret_access_key = yyyy
```
* cdk bootstrap
* cdk deploy --all --require-approval never

