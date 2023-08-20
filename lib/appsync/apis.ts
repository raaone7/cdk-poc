import { AppsyncConfiguration } from "../_core/types";
import { AddressTable } from "../dynamodb/tables";
import { AddressService } from "../lambda/lambdas";

// id= DDBT1

export const apis: AppsyncConfiguration[] = [
	{
		apiName: "addressGraphqlApi",
		schemaPath: "lib/appsync/schemas/address.graphql",
		dataSources: [
			{
				ref: "DynamodbAddressTableDS",
				type: "dynamodb",
				source: AddressTable.ref, // DDBT1
			},
			{
				ref: "LambdaAddressServciceDS",
				type: "lambda",
				source: AddressService.ref,
			},
		],
		mutations: [
			{
				fieldName: "saveAddress",
				resolverPath: "lib/appsync/resolvers/save_address.js",
				dataSourceRef: "LambdaAddressServciceDS",
			},
		],
		queries: [
			{
				fieldName: "addressDirect",
				resolverPath: "lib/appsync/resolvers/get_address_direct.js",
				dataSourceRef: "DynamodbAddressTableDS",
			},
			{
				fieldName: "address",
				resolverPath: "lib/appsync/resolvers/get_address.js",
				dataSourceRef: "LambdaAddressServciceDS",
			},
		],
	},
];
