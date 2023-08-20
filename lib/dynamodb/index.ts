import { App, Stack } from "aws-cdk-lib";
import { builder } from "../_core/builder";
import { tables } from "./tables";

export class DynamoDBStack extends Stack {
	constructor(app: App) {
		super(app, DynamoDBStack.name, {});
		const builderFunction = builder(this).buildDynamoDBTable;
		Object.values(tables).map((table) => {
			table.awsEntity = builderFunction(table.configuration);
		});
	}
}
