#!/usr/bin/env node
import "source-map-support/register";
import { App } from "aws-cdk-lib";

import { IAMStack } from "../lib/iam";
import { CloudwatchStack } from "../lib/cloudwatch";
import { DynamoDBStack } from "../lib/dynamodb";
import { LambdaStack } from "../lib/lambda";
import { AppSyncStack } from "../lib/appsync";

const app = new App();
new IAMStack(app);
new CloudwatchStack(app);
new DynamoDBStack(app);
new LambdaStack(app);
new AppSyncStack(app);
