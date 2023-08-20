import { Duration, Stack, aws_dynamodb, aws_iam, aws_lambda, aws_logs } from "aws-cdk-lib";
import {
	IAMRoleConfiguration,
	DynamoDBTableConfiguration,
	LambdaConfiguration,
	LogGroupConfiguration,
} from "./types";

export const builder = (stack: Stack) => {
	const buildDynamoDBTable = (configuration: DynamoDBTableConfiguration) => {
		const table = new aws_dynamodb.Table(stack, `${configuration.tableName}Table`, {
			billingMode: configuration.billingMode,
			tableName: configuration.tableName,
			partitionKey: configuration.partitionKey,
			sortKey: configuration.sortKey,
		});
		configuration.gsi?.forEach((index) => {
			table.addGlobalSecondaryIndex(index);
		});
		return table;
	};

	const buildIAMRole = (configuration: IAMRoleConfiguration) => {
		const role = new aws_iam.Role(stack, configuration.roleName, {
			roleName: configuration.roleName,
			assumedBy: configuration.assumedBy,
			description: configuration.description,
		});
		configuration.managedPolicies?.forEach((policy) => {
			role.addManagedPolicy(policy);
		});
		return role;
	};

	const buildCloudwatchLogGroup = (configuration: LogGroupConfiguration) => {
		const logGroup = new aws_logs.LogGroup(stack, `${configuration.logGroupName}`, {
			logGroupName: configuration.logGroupName,
			retention: configuration.retention,
		});
		return logGroup;
	};

	const buildLambdaFunction = (configuration: LambdaConfiguration) => {
		const lambdaProps: aws_lambda.FunctionProps = {
			code: configuration.code,
			functionName: configuration.functionName,
			runtime: aws_lambda.Runtime.NODEJS_18_X,
			architecture: aws_lambda.Architecture.ARM_64,
			handler: "index.handler",
			environment: {
				NODE_ENV: "production",
			},
			timeout: Duration.seconds(30),
			role: configuration.role,
		};
		const lambdaFunction = new aws_lambda.Function(
			stack,
			`${configuration.functionName}Function`,
			lambdaProps,
		);
		return lambdaFunction;
	};

	return { buildIAMRole, buildDynamoDBTable, buildLambdaFunction, buildCloudwatchLogGroup };
};
