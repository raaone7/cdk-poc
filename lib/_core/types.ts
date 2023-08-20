import { aws_dynamodb, aws_iam, aws_lambda, aws_logs } from "aws-cdk-lib";

export type DynamoDBTableConfiguration = {
	ref: string;
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

export type IAMRoleConfiguration = {
	ref: string;
	roleName: string;
	description?: string;
	assumedBy: aws_iam.ServicePrincipal;
	managedPolicies?: aws_iam.IManagedPolicy[];
};

export type LambdaConfiguration = {
	ref: string;
	functionName: string;
	code: aws_lambda.InlineCode;
	role: string;
	logGroup: string;
};

export type LogGroupConfiguration = {
	ref: string;
	logGroupName: string;
	retention?: aws_logs.RetentionDays;
};

export type AppsyncConfiguration = {
	dataSources: (
		| {
				ref: string;
				type: "lambda";
				source: string;
		  }
		| {
				ref: string;
				type: "dynamodb";
				source: string;
		  }
	)[];
	queries: {
		resolverPath: string;
		fieldName: string;
		dataSourceRef?: string;
	}[];
	mutations: {
		resolverPath: string;
		fieldName: string;
		dataSourceRef?: string;
	}[];
	schemaPath: string;
	apiName: string;
};

export type S3Configuration = {
	ref: string;
	bucketName: string;
};
