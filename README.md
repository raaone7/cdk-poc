# Welcome to CDK TypeScript project

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

## Prerequisites
- PNPM: Follow instructions [here](https://pnpm.io/installation)
* aws account (new or existing)
* aws CDK 
```
npm install -g aws-cdk
```
* store your credentials in home directory C:\Users\username\.aws
```
[default]
region=us-east-1
aws_access_key_id = xxxx
aws_secret_access_key = yyyy
```
* cdk bootstrap


## Deployment (from local)
* pnpm i
* pnpm run deploy
