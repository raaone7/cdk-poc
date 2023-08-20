import { aws_dynamodb } from "aws-cdk-lib";
import { DynamoDBTableConfiguration } from "../_core/types";
const { STRING } = aws_dynamodb.AttributeType;

export const AddressTable: DynamoDBTableConfiguration = {
	ref: "Address",
	billingMode: aws_dynamodb.BillingMode.PAY_PER_REQUEST,
	tableName: "Address",
	partitionKey: { name: "id", type: STRING },
	gsi: [
		{
			indexName: "userId-createdAt-index",
			partitionKey: { name: "userId", type: STRING },
			sortKey: { name: "createdAt", type: STRING },
		},
	],
};

export const tables: DynamoDBTableConfiguration[] = [AddressTable];
