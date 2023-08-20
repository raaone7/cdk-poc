import {
	Duration,
	Stack,
	aws_appsync,
	aws_dynamodb,
	aws_iam,
	aws_lambda,
	aws_logs,
} from "aws-cdk-lib";
import {
	IAMRoleConfiguration,
	DynamoDBTableConfiguration,
	LambdaConfiguration,
	LogGroupConfiguration,
	AppSyncConfiguration,
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

	const buildAppSyncAPI = (configuration: AppSyncConfiguration) => {
		const api = new aws_appsync.GraphqlApi(stack, "", {
			name: configuration.fieldName,
			schema: aws_appsync.SchemaFile.fromAsset(configuration.schemaPath),
			authorizationConfig: {
				defaultAuthorization: {
					authorizationType: aws_appsync.AuthorizationType.API_KEY,
				},
			},
		});
		switch (configuration.dataSource.type) {
			case "lambda":
				api.addLambdaDataSource(
					configuration.dataSource.name,
					configuration.dataSource.source as aws_lambda.Function,
				);
				break;
			case "dynamodb":
				api.addDynamoDbDataSource(
					configuration.dataSource.name,
					configuration.dataSource.source as aws_dynamodb.Table,
				);
				break;
			default:
				api.addNoneDataSource(configuration.dataSource?.name || "NoneDataSource");
		}
		new aws_appsync.Resolver(stack, `${configuration.fieldName}Resolver`, {
			api,
			fieldName: configuration.fieldName,
			typeName: configuration.type,
			// TODO: Fix datasource
			// dataSource: configuration.dataSource.source,
			runtime: aws_appsync.FunctionRuntime.JS_1_0_0,
			code: aws_appsync.Code.fromAsset(configuration.resolverPath),
		});

		return api;
	};

	return {
		buildIAMRole,
		buildDynamoDBTable,
		buildLambdaFunction,
		buildCloudwatchLogGroup,
		buildAppSyncAPI,
	};
};
