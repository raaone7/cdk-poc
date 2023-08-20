import { aws_dynamodb, aws_iam, aws_lambda, aws_logs } from "aws-cdk-lib";

export type DynamoDBTableConfiguration = {
	tableName: string;
	billingMode: aws_dynamodb.BillingMode;
	partitionKey: aws_dynamodb.Attribute;
	sortKey?: aws_dynamodb.Attribute;
	gsi?: {
		indexName: aws_dynamodb.GlobalSecondaryIndexProps["indexName"];
		partitionKey: aws_dynamodb.GlobalSecondaryIndexProps["partitionKey"];
		sortKey?: aws_dynamodb.GlobalSecondaryIndexProps["sortKey"];
	}[];
};
export type DynamoDBTable = {
	configuration: DynamoDBTableConfiguration;
	awsEntity: aws_dynamodb.Table | null;
};

export type IAMRoleConfiguration = {
	roleName: string;
	description?: string;
	assumedBy: aws_iam.ServicePrincipal;
	managedPolicies?: aws_iam.IManagedPolicy[];
};
export type IAMRole = {
	configuration: IAMRoleConfiguration;
	awsEntity: aws_iam.Role | null;
};

export type LambdaConfiguration = {
	functionName: string;
	code: aws_lambda.InlineCode;
	role: aws_iam.Role;
	logGroup: aws_logs.LogGroup;
};
export type LambdaFunction = {
	configuration: LambdaConfiguration;
	awsEntity: aws_lambda.Function | null;
};

export type LogGroupConfiguration = {
	logGroupName: string;
	retention?: aws_logs.RetentionDays;
};
export type LogGroup = {
	configuration: LogGroupConfiguration;
	awsEntity: aws_logs.LogGroup | null;
};
