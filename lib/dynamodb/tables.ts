import { aws_dynamodb } from "aws-cdk-lib";
import { DynamoDBTable, DynamoDBTableConfiguration } from "../_core/types";
const { STRING } = aws_dynamodb.AttributeType;

const AddressTable: DynamoDBTableConfiguration = {
	billingMode: aws_dynamodb.BillingMode.PAY_PER_REQUEST,
	tableName: "Address",
	partitionKey: { name: "id", type: STRING },
	gsi: [
		{
			indexName: "userId-index",
			partitionKey: { name: "userId", type: STRING },
			sortKey: { name: "createdAt", type: STRING },
		},
	],
};

type DynamoDBTableCollection = Record<string, DynamoDBTable>;
export const tables: DynamoDBTableCollection = {
	AddressTable: {
		configuration: AddressTable,
		awsEntity: null,
	},
};
