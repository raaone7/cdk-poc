#!/usr/bin/env node
import "dotenv/config";
import "source-map-support/register";

import { App } from "aws-cdk-lib";
import { IAMStack } from "../lib/iam";
import { CloudwatchStack } from "../lib/cloudwatch";
import { DynamoDBStack } from "../lib/dynamodb";
import { LambdaStack } from "../lib/lambda";
import { AppsyncStack } from "../lib/appsync";
// import { S3Stack } from "../lib/s3";

const app = new App();

const env = {
	region: process.env.AWS_REGION,
	account: process.env.AWS_ACCOUNT_ID,
};

const { roles } = new IAMStack(app, { env });
// new S3Stack(app, { env });
const { logGroups } = new CloudwatchStack(app, { env });
const { tables } = new DynamoDBStack(app, { env });
const { lambdas } = new LambdaStack(app, { env }, { logGroups, roles });
new AppsyncStack(app, { env }, { lambdas, tables });
