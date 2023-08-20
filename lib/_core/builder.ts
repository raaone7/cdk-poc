import {
	Duration,
	Stack,
	aws_appsync,
	aws_dynamodb,
	aws_iam,
	aws_lambda,
	aws_logs,
	aws_s3,
} from "aws-cdk-lib";
import {
	IAMRoleConfiguration,
	DynamoDBTableConfiguration,
	LambdaConfiguration,
	LogGroupConfiguration,
	AppsyncConfiguration,
	S3Configuration,
} from "./types";
import { ILogGroup } from "aws-cdk-lib/aws-logs";
import { IRole } from "aws-cdk-lib/aws-iam";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { Table } from "aws-cdk-lib/aws-dynamodb";

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

	const buildLambdaFunction = (
		configuration: LambdaConfiguration,
		role: IRole,
		_logGroup: ILogGroup,
	) => {
		const lambdaProps: aws_lambda.FunctionProps = {
			code: configuration.code,
			functionName: configuration.functionName,
			runtime: aws_lambda.Runtime.NODEJS_18_X,
			architecture: aws_lambda.Architecture.ARM_64,
			handler: "index.handler",
			environment: {
				NODE_ENV: "production",
			},
			timeout: Duration.seconds(60),
			role: role,
		};
		const lambdaFunction = new aws_lambda.Function(
			stack,
			`${configuration.functionName}Function`,
			lambdaProps,
		);
		return lambdaFunction;
	};

	const buildAppsyncAPI = (
		configuration: AppsyncConfiguration,
		lambdas: Map<string, IFunction>,
		tables: Map<string, Table>,
	) => {
		const apiId = `${configuration.apiName}API`;
		const api = new aws_appsync.GraphqlApi(stack, apiId, {
			name: configuration.apiName,
			schema: aws_appsync.SchemaFile.fromAsset(configuration.schemaPath),
			authorizationConfig: {
				defaultAuthorization: {
					authorizationType: aws_appsync.AuthorizationType.API_KEY,
				},
			},
			logConfig: {
				fieldLogLevel: aws_appsync.FieldLogLevel.ALL,
			},
		});
		const apiDataSources = {};
		// Data sources
		for (const dataSource of configuration.dataSources) {
			switch (dataSource.type) {
				case "lambda": {
					// @ts-ignore
					apiDataSources[dataSource.ref] = api.addLambdaDataSource(
						`${apiId}${dataSource.source}`,
						lambdas.get(dataSource.source) as IFunction,
					);
					break;
				}

				case "dynamodb": {
					// @ts-ignore
					apiDataSources[dataSource.ref] = api.addDynamoDbDataSource(
						`${apiId}${dataSource.source}`,
						// @ts-ignore
						tables.get(dataSource.source) as Table,
					);
					break;
				}

				default:
					throw new Error("unknown type");
			}
		}
		// Resolvers
		for (const query of configuration.queries) {
			new aws_appsync.Resolver(stack, `${query.fieldName}QueryResolver`, {
				api,
				fieldName: query.fieldName,
				typeName: "Query",
				runtime: aws_appsync.FunctionRuntime.JS_1_0_0,
				code: aws_appsync.Code.fromAsset(query.resolverPath),
				// @ts-ignore
				dataSource: apiDataSources[query.dataSourceRef],
			});
		}

		for (const mutation of configuration.mutations) {
			new aws_appsync.Resolver(stack, `${mutation.fieldName}MutationResolver`, {
				api,
				fieldName: mutation.fieldName,
				typeName: "Mutation",
				runtime: aws_appsync.FunctionRuntime.JS_1_0_0,
				code: aws_appsync.Code.fromAsset(mutation.resolverPath),
				// @ts-ignore
				dataSource: apiDataSources[mutation.dataSourceRef],
			});
		}

		return api;
	};

	const buildS3Bucket = (configuration: S3Configuration) => {
		return new aws_s3.Bucket(stack, `${configuration.bucketName}Bucket`, {
			bucketName: configuration.bucketName,
		});
	};

	return {
		buildIAMRole,
		buildDynamoDBTable,
		buildLambdaFunction,
		buildCloudwatchLogGroup,
		buildAppsyncAPI,
		buildS3Bucket,
	};
};
