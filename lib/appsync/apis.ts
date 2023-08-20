import { aws_dynamodb, aws_lambda } from "aws-cdk-lib";
import { AppSyncConfiguration, AppSyncAPI } from "../_core/types";
import { lambdas } from "../lambda/lambdas";
import { tables } from "../dynamodb/tables";

const saveAddressMutation: AppSyncConfiguration = {
	fieldName: "saveAddress",
	type: "Mutation",
	schemaPath: "./schema.secured/address.graphql",
	resolverPath: "resolvers/save_address.js",
	dataSource: {
		type: "lambda",
		name: lambdas.AddressService.configuration.functionName,
		source: lambdas.AddressService.awsEntity as aws_lambda.Function,
	},
};

const addressQuery: AppSyncConfiguration = {
	fieldName: "address",
	type: "Query",
	schemaPath: "./schema.secured/address.graphql",
	resolverPath: "resolvers/get_address.js",
	dataSource: {
		type: "lambda",
		name: lambdas.AddressService.configuration.functionName,
		source: lambdas.AddressService.awsEntity as aws_lambda.Function,
	},
};

const addressDirectQuery: AppSyncConfiguration = {
	fieldName: "addressDirect",
	type: "Query",
	schemaPath: "schema.secured/address.graphql",
	resolverPath: "resolvers/get_address_direct.js",
	dataSource: {
		type: "dynamodb",
		name: tables.AddressTable.configuration.tableName,
		source: tables.AddressTable.awsEntity as aws_dynamodb.Table,
	},
};

type AppSyncCollection = Record<string, AppSyncAPI>;
export const apis: AppSyncCollection = {
	saveAddressMutation: {
		configuration: saveAddressMutation,
		awsEntity: null,
	},
	addressQuery: {
		configuration: addressQuery,
		awsEntity: null,
	},
	addressDirectQuery: {
		configuration: addressDirectQuery,
		awsEntity: null,
	},
};
